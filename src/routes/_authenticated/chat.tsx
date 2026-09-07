import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUp, MessageSquare, Paperclip, Plus, Sparkles } from "lucide-react";
import { EmptyState } from "@/components/app/EmptyState";
import { ChatMessage, type ChatRole } from "@/components/app/ChatMessage";
import { ErrorState } from "@/components/app/StatusStates";
import { AppButton, AppInput, SearchField } from "@/components/ui/field-controls";
import { supabase } from "@/integrations/supabase/client";
import { sendChatMessage } from "@/lib/chat.functions";

const examplePrompts = [
  "Summarize this document",
  "Help me prepare for a meeting",
  "Research this topic",
  "Draft a professional email",
];

export const Route = createFileRoute("/_authenticated/chat")({
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

type UiMessage = { id: string; role: ChatRole; content: string };

function ChatPage() {
  const [draft, setDraft] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [pending, setPending] = useState<UiMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const send = useServerFn(sendChatMessage);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversations = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data, error: dbError } = await supabase
        .from("conversations")
        .select("id, title, updated_at")
        .order("updated_at", { ascending: false })
        .limit(30);
      if (dbError) throw dbError;
      return data ?? [];
    },
  });

  // Open the most recent conversation on first load.
  useEffect(() => {
    if (conversationId === null && conversations.data && conversations.data.length > 0) {
      setConversationId(conversations.data[0]!.id);
    }
  }, [conversations.data, conversationId]);

  const messages = useQuery({
    queryKey: ["messages", conversationId],
    enabled: Boolean(conversationId),
    queryFn: async () => {
      const { data, error: dbError } = await supabase
        .from("messages")
        .select("id, role, content, created_at")
        .eq("conversation_id", conversationId!)
        .order("created_at", { ascending: true });
      if (dbError) throw dbError;
      return (data ?? []).map((m) => ({
        id: m.id,
        role: (m.role === "assistant" ? "assistant" : "user") as ChatRole,
        content: m.content,
      }));
    },
  });

  const mutation = useMutation({
    mutationFn: async (text: string) => send({ data: { conversationId, message: text } }),
    onSuccess: async (result) => {
      setConversationId(result.conversationId);
      setPending([]);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["messages", result.conversationId] }),
        queryClient.invalidateQueries({ queryKey: ["conversations"] }),
      ]);
    },
    onError: (err: unknown) => {
      setPending([]);
      const message = err instanceof Error ? err.message : "";
      setError(
        message && message.length < 160
          ? message
          : "Something went wrong while generating the response. Please try again.",
      );
    },
  });

  const shownMessages: UiMessage[] = [...(messages.data ?? []), ...pending];
  const isSending = mutation.isPending;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [shownMessages.length, isSending]);

  function handleSend() {
    const text = draft.trim();
    if (!text || isSending) return;
    setError(null);
    setDraft("");
    setPending([{ id: `pending-${Date.now()}`, role: "user", content: text }]);
    mutation.mutate(text);
  }

  function startNewChat() {
    setConversationId(null);
    setPending([]);
    setError(null);
    setDraft("");
  }

  const filteredConversations = (conversations.data ?? []).filter((c) =>
    c.title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <section className="flex min-h-[78vh] flex-col">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-medium tracking-tight">AI Chat</h1>
        <AppButton onClick={startNewChat}>
          <Plus className="size-4" />
          New Chat
        </AppButton>
      </div>

      <div className="mt-4 grid flex-1 gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="glass-soft hidden flex-col rounded-[20px] p-4 lg:flex">
          <SearchField
            placeholder="Search conversations…"
            aria-label="Search conversations"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="mt-4 flex flex-1 flex-col">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-1 items-center">
                <EmptyState
                  icon={MessageSquare}
                  title="No conversations"
                  description="Start a new chat to build your history."
                  className="w-full px-4 py-8"
                />
              </div>
            ) : (
              <ul className="flex flex-col gap-1">
                {filteredConversations.map((conversation) => (
                  <li key={conversation.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setConversationId(conversation.id);
                        setPending([]);
                        setError(null);
                      }}
                      className={
                        "w-full truncate rounded-[12px] px-3 py-2 text-left text-sm transition-colors " +
                        (conversation.id === conversationId
                          ? "bg-glass/80 text-foreground"
                          : "text-foreground/60 hover:bg-glass/50 hover:text-foreground")
                      }
                    >
                      {conversation.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <div className="glass-panel flex min-h-[60vh] flex-1 flex-col rounded-[20px] p-5">
          {shownMessages.length === 0 && !isSending ? (
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
          ) : (
            <div ref={scrollRef} className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
              {shownMessages.map((message) => (
                <ChatMessage key={message.id} role={message.role} content={message.content} />
              ))}
              {isSending ? (
                <div className="flex items-center gap-2 text-sm text-foreground/50">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-br from-coral/40 to-sky/40 text-xs font-semibold">
                    S
                  </span>
                  <span className="animate-pulse">Smart Office Assistant is typing…</span>
                </div>
              ) : null}
            </div>
          )}

          {error ? <ErrorState className="mt-4" description={error} /> : null}

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
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message Smart Office Assistant..."
              className="min-w-0 flex-1 border-0 bg-transparent px-0 focus-visible:ring-0"
            />
            <button
              type="button"
              onClick={handleSend}
              aria-label="Send message"
              disabled={draft.trim().length === 0 || isSending}
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
