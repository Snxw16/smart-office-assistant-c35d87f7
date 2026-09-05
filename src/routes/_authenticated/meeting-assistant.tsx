import { createFileRoute } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { GlassPanel, SectionPanel } from "@/components/app/GlassPanel";
import { EmptyState } from "@/components/app/EmptyState";
import { FileUploadArea } from "@/components/app/FileUploadArea";
import { AppButton, AppTextarea } from "@/components/ui/field-controls";

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

function MeetingAssistantPage() {
  return (
    <section>
      <PageHeader
        eyebrow="Meeting Assistant"
        title="Meeting Assistant"
        description="Turn your meeting notes and transcripts into clear summaries, decisions and actionable tasks."
      />

      <GlassPanel className="mt-6">
        <AppTextarea rows={7} placeholder="Paste your meeting notes or transcript here..." />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <FileUploadArea />
          <AppButton className="ml-auto">Summarize Meeting</AppButton>
        </div>
      </GlassPanel>

      <SectionPanel title="Recent Meeting Summaries" className="mt-4">
        <EmptyState
          icon={ScrollText}
          title="No summaries yet"
          description="Summarize your first meeting to see it here."
        />
      </SectionPanel>
    </section>
  );
}
