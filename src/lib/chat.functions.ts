import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const MAX_HISTORY = 20;

type SendInput = {
  conversationId?: string | null;
  message: string;
};

export type SendMessageResult = {
  conversationId: string;
  reply: string;
};

class FriendlyError extends Error {}

export const sendChatMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: SendInput) => {
    const message = (input?.message ?? "").trim();
    if (!message) throw new Error("Please enter a message.");
    if (message.length > 8000) throw new Error("That message is too long.");
    return { conversationId: input?.conversationId ?? null, message };
  })
  .handler(async ({ data, context }): Promise<SendMessageResult> => {
    const { supabase, userId } = context;

    try {
      let conversationId = data.conversationId;

      if (conversationId) {
        // Ownership is enforced by RLS; verify the row is reachable.
        const { data: existing, error } = await supabase
          .from("conversations")
          .select("id")
          .eq("id", conversationId)
          .maybeSingle();
        if (error) throw new FriendlyError("We couldn't load that conversation.");
        if (!existing) conversationId = null;
      }

      if (!conversationId) {
        const title = data.message.slice(0, 60);
        const { data: created, error } = await supabase
          .from("conversations")
          .insert({ user_id: userId, title })
          .select("id")
          .single();
        if (error || !created) throw new FriendlyError("We couldn't start the conversation.");
        conversationId = created.id;
      }

      const { error: userMsgError } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        user_id: userId,
        role: "user",
        content: data.message,
      });
      if (userMsgError) throw new FriendlyError("We couldn't save your message.");

      const { data: history } = await supabase
        .from("messages")
        .select("role, content, created_at")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: false })
        .limit(MAX_HISTORY);

      const ordered = (history ?? []).slice().reverse();

      const key = process.env["LOVABLE_API_KEY"];
      if (!key) throw new FriendlyError("The assistant is not available right now.");

      const { createLovableAiGateway, getAiModelId, SYSTEM_PROMPT } = await import(
        "./ai-gateway.server"
      );
      const gateway = createLovableAiGateway(key);
      const { streamText } = await import("ai");

      let reply: string;
      try {
        const result = streamText({
          model: gateway(getAiModelId()),
          system: SYSTEM_PROMPT,
          messages: ordered.map((m) => ({
            role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
            content: m.content,
          })),
        });
        reply = (await result.text).trim();
      } catch (error) {
        const status = (error as { statusCode?: number; status?: number })?.statusCode ??
          (error as { status?: number })?.status;
        console.error("[chat] AI gateway error", error);
        if (status === 429) {
          throw new FriendlyError("The assistant is busy right now. Please try again shortly.");
        }
        if (status === 402 || status === 403) {
          throw new FriendlyError("The assistant is temporarily unavailable. Please try again later.");
        }
        throw new FriendlyError("Something went wrong while generating the response. Please try again.");
      }

      if (!reply) {
        throw new FriendlyError("Something went wrong while generating the response. Please try again.");
      }

      const { error: assistantMsgError } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        user_id: userId,
        role: "assistant",
        content: reply,
      });
      if (assistantMsgError) {
        console.error("[chat] failed to save assistant message", assistantMsgError);
      }

      await supabase
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", conversationId);

      return { conversationId, reply };
    } catch (error) {
      if (error instanceof FriendlyError) throw new Error(error.message);
      console.error("[chat] unexpected error", error);
      throw new Error("Something went wrong while generating the response. Please try again.");
    }
  });
