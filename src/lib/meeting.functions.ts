import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type AnalyzeInput = {
  title?: string | null;
  notes: string;
};

export type MeetingActionItem = {
  task: string;
  assignee: string | null;
  due_date: string | null;
};

export type MeetingAnalysis = {
  meetingId: string;
  title: string;
  summary: string;
  keyPoints: string[];
  decisions: string[];
  actionItems: MeetingActionItem[];
};

class FriendlyError extends Error {}

const PROMPT = [
  "You analyze workplace meeting notes or transcripts.",
  "Return ONLY valid JSON (no markdown fences) with this exact shape:",
  '{"title":string,"summary":string,"keyPoints":string[],"decisions":string[],',
  '"actionItems":[{"task":string,"assignee":string|null,"dueDate":string|null}]}',
  "Rules: never invent an assignee or due date — use null when not mentioned.",
  "Keep the summary to a short professional paragraph.",
  "Keep each key point and decision to one concise sentence.",
  "If a title is provided by the user, reuse it.",
].join(" ");

function extractJson(text: string): unknown {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new FriendlyError("We couldn't read the analysis. Please try again.");
  return JSON.parse(cleaned.slice(start, end + 1));
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => String(v ?? "").trim()).filter(Boolean).slice(0, 12);
}

export const analyzeMeeting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: AnalyzeInput) => {
    const notes = (input?.notes ?? "").trim();
    if (!notes) throw new Error("Please paste your meeting notes first.");
    if (notes.length > 20000) throw new Error("Those notes are too long.");
    return { title: (input?.title ?? "").trim().slice(0, 120), notes };
  })
  .handler(async ({ data, context }): Promise<MeetingAnalysis> => {
    const { supabase, userId } = context;

    try {
      const key = process.env["LOVABLE_API_KEY"];
      if (!key) throw new FriendlyError("The assistant is not available right now.");

      const { createLovableAiGateway, getAiModelId } = await import("./ai-gateway.server");
      const { streamText } = await import("ai");
      const gateway = createLovableAiGateway(key);

      let raw: string;
      try {
        const result = streamText({
          model: gateway(getAiModelId()),
          system: PROMPT,
          messages: [
            {
              role: "user" as const,
              content: `${data.title ? `Meeting title: ${data.title}\n\n` : ""}Meeting notes:\n${data.notes}`,
            },
          ],
        });
        raw = (await result.text).trim();
      } catch (error) {
        const status =
          (error as { statusCode?: number })?.statusCode ?? (error as { status?: number })?.status;
        console.error("[meeting] AI gateway error", error);
        if (status === 429) throw new FriendlyError("The assistant is busy right now. Please try again shortly.");
        if (status === 402 || status === 403)
          throw new FriendlyError("The assistant is temporarily unavailable. Please try again later.");
        throw new FriendlyError("Something went wrong while analyzing the meeting. Please try again.");
      }

      const parsed = extractJson(raw) as Record<string, unknown>;
      const title = data.title || String(parsed["title"] ?? "").trim() || "Untitled meeting";
      const summary = String(parsed["summary"] ?? "").trim();
      const keyPoints = asStringList(parsed["keyPoints"]);
      const decisions = asStringList(parsed["decisions"]);

      const actionItems: MeetingActionItem[] = (
        Array.isArray(parsed["actionItems"]) ? parsed["actionItems"] : []
      )
        .map((item) => {
          const row = (item ?? {}) as Record<string, unknown>;
          const task = String(row["task"] ?? "").trim();
          const assigneeRaw = row["assignee"];
          const dueRaw = row["dueDate"] ?? row["due_date"];
          return {
            task,
            assignee: assigneeRaw ? String(assigneeRaw).trim() || null : null,
            due_date: dueRaw ? String(dueRaw).trim() || null : null,
          };
        })
        .filter((item) => item.task)
        .slice(0, 20);

      if (!summary && keyPoints.length === 0 && actionItems.length === 0) {
        throw new FriendlyError("Something went wrong while analyzing the meeting. Please try again.");
      }

      const storedSummary = [
        summary,
        keyPoints.length ? `\n\nKey discussion points:\n${keyPoints.map((p) => `- ${p}`).join("\n")}` : "",
        decisions.length ? `\n\nKey decisions:\n${decisions.map((d) => `- ${d}`).join("\n")}` : "",
      ].join("");

      const { data: meeting, error: meetingError } = await supabase
        .from("meetings")
        .insert({
          user_id: userId,
          title,
          notes: data.notes,
          summary: storedSummary,
          meeting_date: new Date().toISOString(),
        })
        .select("id")
        .single();
      if (meetingError || !meeting) throw new FriendlyError("We couldn't save this meeting.");

      if (actionItems.length) {
        const { error: itemsError } = await supabase.from("meeting_action_items").insert(
          actionItems.map((item) => ({
            meeting_id: meeting.id,
            user_id: userId,
            task: item.task,
            assignee: item.assignee,
            // Free-form dates like "Friday" are kept in the task text, not stored as a date.
            due_date: null,
          })),
        );
        if (itemsError) console.error("[meeting] failed to save action items", itemsError);
      }

      return { meetingId: meeting.id, title, summary, keyPoints, decisions, actionItems };
    } catch (error) {
      if (error instanceof FriendlyError) throw new Error(error.message);
      console.error("[meeting] unexpected error", error);
      throw new Error("Something went wrong while analyzing the meeting. Please try again.");
    }
  });
