import { createFileRoute } from "@tanstack/react-router";
import { Telescope } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { GlassPanel, SectionPanel } from "@/components/app/GlassPanel";
import { EmptyState } from "@/components/app/EmptyState";
import {
  AppButton,
  AppSelect,
  AppTextarea,
  LabeledField,
} from "@/components/ui/field-controls";

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "Research Assistant — Smart Office Assistant" },
      {
        name: "description",
        content:
          "Explore topics, analyze information and organize research with reliable sources.",
      },
      { property: "og:title", content: "Research Assistant — Smart Office Assistant" },
      {
        property: "og:description",
        content:
          "Explore topics, analyze information and organize research with reliable sources.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchAssistantPage,
});

function ResearchAssistantPage() {
  return (
    <section>
      <PageHeader
        eyebrow="Research Assistant"
        title="Research Assistant"
        description="Explore topics, analyze information and organize research with reliable sources."
      />

      <GlassPanel className="mt-6">
        <AppTextarea rows={3} placeholder="What would you like to research?" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <LabeledField label="Research depth">
            <AppSelect defaultValue="Balanced">
              <option>Quick</option>
              <option>Balanced</option>
              <option>Deep</option>
            </AppSelect>
          </LabeledField>
          <LabeledField label="Source preferences">
            <AppSelect defaultValue="All sources">
              <option>All sources</option>
              <option>Academic</option>
              <option>News</option>
            </AppSelect>
          </LabeledField>
          <LabeledField label="Date range">
            <AppSelect defaultValue="Any time">
              <option>Any time</option>
              <option>Past year</option>
              <option>Past month</option>
            </AppSelect>
          </LabeledField>
        </div>
        <AppButton className="mt-4">Start Research</AppButton>
      </GlassPanel>

      <SectionPanel title="Recent Research" className="mt-4">
        <EmptyState
          icon={Telescope}
          title="No research saved"
          description="New research threads will be collected here."
        />
      </SectionPanel>
    </section>
  );
}
