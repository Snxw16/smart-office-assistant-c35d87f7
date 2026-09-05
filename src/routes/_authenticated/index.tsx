import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, ScrollText, Sparkles, Telescope } from "lucide-react";
import { CapabilityCard } from "@/components/app/CapabilityCard";
import { EmptyState } from "@/components/app/EmptyState";
import { PageHeader } from "@/components/app/PageHeader";
import { SectionPanel } from "@/components/app/GlassPanel";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Smart Office Assistant" },
      {
        name: "description",
        content:
          "Your intelligent workspace for meetings, research and everyday productivity.",
      },
      { property: "og:title", content: "Dashboard — Smart Office Assistant" },
      {
        property: "og:description",
        content:
          "Your intelligent workspace for meetings, research and everyday productivity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <section>
      <PageHeader
        eyebrow="Dashboard"
        title="Welcome to Smart Office Assistant"
        description="Your intelligent workspace for meetings, research and everyday productivity."
      />

      <h2 className="mt-7 text-base font-bold text-foreground">
        What would you like to do?
      </h2>

      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <CapabilityCard
          to="/meeting-assistant"
          icon={ScrollText}
          tone="coral"
          title="Meeting Assistant"
          description="Summarize meetings, extract decisions and identify action items."
          cta="Start Meeting"
        />
        <CapabilityCard
          to="/research-assistant"
          icon={Telescope}
          tone="mint"
          title="Research Assistant"
          description="Research topics, compare information and organize findings with sources."
          cta="Start Research"
        />
        <CapabilityCard
          to="/chat"
          icon={MessageSquare}
          tone="sky"
          title="AI Chat"
          description="Chat with your AI assistant, ask questions, brainstorm and analyze information."
          cta="Start Chat"
        />
      </div>

      <SectionPanel title="Recent Activity" className="mt-5 sm:p-5">
        <EmptyState
          icon={Sparkles}
          title="No recent activity yet"
          description="Your meeting summaries, research threads and conversations will appear here as you work."
          className="py-7"
        />
      </SectionPanel>
    </section>
  );
}
