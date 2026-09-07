import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CalendarClock, CheckCircle2, ListChecks, ScrollText, Sparkles, User2 } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { GlassPanel, SectionPanel } from "@/components/app/GlassPanel";
import { EmptyState } from "@/components/app/EmptyState";
import { AppButton, AppInput, AppTextarea } from "@/components/ui/field-controls";
import { ErrorState, LoadingState } from "@/components/app/StatusStates";
import { supabase } from "@/integrations/supabase/client";
import { analyzeMeeting, type MeetingAnalysis } from "@/lib/meeting.functions";

export const Route = createFileRoute("/_authenticated/meeting-assistant")({
  head: () => ({
    meta: [
      { title: "Meeting Assistant — Smart Office Assistant" },
      {
        name: "description",
        content:
          "Turn meeting notes and transcripts into clear summaries, decisions and actionable tasks.",
      },
      { property: "og:title", content: "Meeting Assistant — Smart Office Assistant" },
      {
        property: "og:description",
        content:
          "Turn meeting notes and transcripts into clear summaries, decisions and actionable tasks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeetingAssistantPage,
});

function BulletCard({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof ListChecks;
  title: string;
  items: string[];
}) {
  if (!items.length) return null;
  return (
    <GlassPanel soft>
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-primary" />
        <h3 className="text-[11px] font-bold tracking-[0.14em] text-foreground/55 uppercase">
          {title}
        </h3>
      </div>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}

function MeetingAssistantPage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<MeetingAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useServerFn(analyzeMeeting);

  const recent = useQuery({
    queryKey: ["meetings", "recent"],
    queryFn: async () => {
      const { data, error: dbError } = await supabase
        .from("meetings")
        .select("id, title, summary, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      if (dbError) throw dbError;
      return data ?? [];
    },
  });

  const mutation = useMutation({
    mutationFn: (input: { title: string; notes: string }) => analyze({ data: input }),
    onSuccess: (data) => {
      setResult(data);
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["meetings", "recent"] });
    },
    onError: (err: unknown) => {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong while analyzing the meeting. Please try again.",
      );
    },
  });

  function handleAnalyze() {
    const trimmed = notes.trim();
    if (!trimmed) {
      setError("Please paste your meeting notes first.");
      return;
    }
    setError(null);
    mutation.mutate({ title: title.trim(), notes: trimmed });
  }

  function handleClear() {
    setTitle("");
    setNotes("");
    setResult(null);
    setError(null);
    mutation.reset();
  }

  return (
    <section>
      <PageHeader
        eyebrow="Meeting Assistant"
        title="Meeting Assistant"
        description="Turn your meeting notes and transcripts into clear summaries, decisions and actionable tasks."
      />

      <GlassPanel className="mt-6">
        <AppInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Meeting title (optional)"
          disabled={mutation.isPending}
        />
        <div className="mt-3">
          <AppTextarea
            rows={9}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your meeting notes or transcript here..."
            disabled={mutation.isPending}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
          <AppButton variant="subtle" onClick={handleClear} disabled={mutation.isPending}>
            Clear / New Meeting
          </AppButton>
          <AppButton onClick={handleAnalyze} disabled={mutation.isPending}>
            <Sparkles className="size-4" />
            {mutation.isPending ? "Analyzing…" : "Analyze Meeting"}
          </AppButton>
        </div>
      </GlassPanel>

      {error ? <ErrorState className="mt-4" description={error} /> : null}

      {mutation.isPending ? (
        <LoadingState className="mt-4" label="Analyzing your meeting…" />
      ) : null}

      {result && !mutation.isPending ? (
        <div className="mt-4 space-y-4">
          {result.summary ? (
            <GlassPanel soft>
              <div className="flex items-center gap-2">
                <ScrollText className="size-4 text-primary" />
                <h3 className="text-[11px] font-bold tracking-[0.14em] text-foreground/55 uppercase">
                  Summary
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{result.summary}</p>
            </GlassPanel>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-2">
            <BulletCard icon={ListChecks} title="Key Discussion Points" items={result.keyPoints} />
            <BulletCard icon={CheckCircle2} title="Key Decisions" items={result.decisions} />
          </div>

          {result.actionItems.length ? (
            <GlassPanel soft>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                <h3 className="text-[11px] font-bold tracking-[0.14em] text-foreground/55 uppercase">
                  Action Items
                </h3>
              </div>
              <ul className="mt-3 space-y-2">
                {result.actionItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[12px] border border-foreground/10 bg-glass/50 px-3 py-2.5 text-sm"
                  >
                    <span className="min-w-0 flex-1 text-foreground/85">{item.task}</span>
                    {item.assignee ? (
                      <span className="inline-flex items-center gap-1 text-xs text-foreground/60">
                        <User2 className="size-3.5" />
                        {item.assignee}
                      </span>
                    ) : null}
                    {item.due_date ? (
                      <span className="inline-flex items-center gap-1 text-xs text-foreground/60">
                        <CalendarClock className="size-3.5" />
                        {item.due_date}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          ) : null}
        </div>
      ) : null}

      <SectionPanel title="Recent Meeting Summaries" className="mt-4">
        {recent.data && recent.data.length ? (
          <ul className="space-y-2">
            {recent.data.map((m) => (
              <li
                key={m.id}
                className="rounded-[12px] border border-foreground/10 bg-glass/50 px-3 py-2.5"
              >
                <p className="text-sm font-medium">{m.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-foreground/55">
                  {m.summary}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={ScrollText}
            title="No summaries yet"
            description="Summarize your first meeting to see it here."
          />
        )}
      </SectionPanel>
    </section>
  );
}
