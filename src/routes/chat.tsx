import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, MessageSquare, Paperclip, Plus, Sparkles } from "lucide-react";
import { EmptyState } from "@/components/app/EmptyState";
import { AppButton, AppInput, SearchField } from "@/components/ui/field-controls";

const examplePrompts = [
  "Summarize this document",
  "Help me prepare for a meeting",
  "Research this topic",
  "Draft a professional email",
];

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — Smart Office Assistant" },
      {
        name: "description",
        content:
          "Ask questions, brainstorm ideas, analyze information or get help with your work.",
      },
      { property: "og:title", content: "AI Chat — Smart Office Assistant" },
      {
        property: "og:description",
        content:
          "Ask questions, brainstorm ideas, analyze information or get help with your work.",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const [draft, setDraft] = useState("");

  return (
    <section className="flex min-h-[78vh] flex-col">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-medium tracking-tight">AI Chat</h1>
        <AppButton>
          <Plus className="size-4" />
          New Chat
        </AppButton>
      </div>

      <div className="mt-4 grid flex-1 gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="glass-soft hidden flex-col rounded-[20px] p-4 lg:flex">
          <SearchField placeholder="Search conversations…" aria-label="Search conversations" />
          <div className="mt-4 flex flex-1 items-center">
            <EmptyState
              icon={MessageSquare}
              title="No conversations"
              description="Start a new chat to build your history."
              className="w-full px-4 py-8"
            />
          </div>
        </aside>

        <div className="glass-panel flex min-h-[60vh] flex-1 flex-col rounded-[20px] p-5">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="grid size-14 place-items-center rounded-full bg-linear-to-br from-coral/30 to-sky/30">
              <Sparkles className="size-6 text-foreground/70" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-medium">How can I help you today?</h2>
            <p className="mt-1 max-w-[44ch] text-sm text-foreground/55">
              Ask questions, brainstorm ideas, analyze information or get help with your work.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setDraft(prompt)}
                  className="field rounded-full px-3.5 py-1.5 text-xs font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="field mt-4 flex items-center gap-2 rounded-[16px] p-2">
            <button
              type="button"
              aria-label="Add attachment"
              className="grid size-9 place-items-center rounded-[12px] text-foreground/50 transition-colors hover:bg-glass/70 hover:text-foreground"
            >
              <Paperclip className="size-4" />
            </button>
            <AppInput
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Message Smart Office Assistant..."
              className="min-w-0 flex-1 border-0 bg-transparent px-0 focus-visible:ring-0"
            />
            <button
              type="button"
              aria-label="Send message"
              disabled={draft.trim().length === 0}
              className="grid size-9 place-items-center rounded-[12px] bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
