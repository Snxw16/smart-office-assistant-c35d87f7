import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, ScrollText, Sparkles, Telescope } from "lucide-react";
import { CapabilityCard } from "@/components/app/CapabilityCard";
import { EmptyState } from "@/components/app/EmptyState";
import { PageHeader } from "@/components/app/PageHeader";
import { SectionPanel } from "@/components/app/GlassPanel";

export const Route = createFileRoute("/")({
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

      <h2 className="mt-8 text-sm font-semibold text-foreground/70">
        What would you like to do?
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>

      <SectionPanel title="Recent Activity" className="mt-4 sm:p-6">
        <EmptyState
          icon={Sparkles}
          title="No recent activity yet"
          description="Your meeting summaries, research threads and conversations will appear here as you work."
        />
      </SectionPanel>
    </section>
  );
}
