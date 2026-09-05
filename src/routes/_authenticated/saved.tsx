import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { GlassPanel } from "@/components/app/GlassPanel";
import { EmptyState } from "@/components/app/EmptyState";
import { FilterTabs } from "@/components/app/FilterTabs";
import { SearchField } from "@/components/ui/field-controls";

const filters = ["All", "Meetings", "Research", "Conversations"] as const;

export const Route = createFileRoute("/_authenticated/saved")({
  head: () => ({
    meta: [
      { title: "Saved — Smart Office Assistant" },
      {
        name: "description",
        content: "Access your saved meetings, research and conversations in one place.",
      },
      { property: "og:title", content: "Saved — Smart Office Assistant" },
      {
        property: "og:description",
        content: "Access your saved meetings, research and conversations in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const [filter, setFilter] = useState<string>("All");

  return (
    <section>
      <PageHeader
        eyebrow="Library"
        title="Saved"
        description="Access your saved meetings, research and conversations in one place."
      />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <FilterTabs options={filters} value={filter} onChange={setFilter} />
        <SearchField className="w-full sm:w-72" placeholder="Search saved items…" />
      </div>

      <GlassPanel soft className="mt-5">
        <EmptyState
          icon={Bookmark}
          title="Nothing saved yet"
          description="Save meetings, research and chats to keep them handy here."
          className="py-12"
        />
      </GlassPanel>
    </section>
  );
}
