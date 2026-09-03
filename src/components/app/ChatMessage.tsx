import { cn } from "@/lib/utils";

export type ChatRole = "user" | "assistant";

export function ChatMessage({ role, content }: { role: ChatRole; content: string }) {
  const isUser = role === "user";
  return (
    <div className={cn("flex w-full gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser ? (
        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-br from-coral/40 to-sky/40 text-xs font-semibold">
          S
        </div>
      ) : null}
      <div
        className={cn(
          "max-w-[80%] rounded-[16px] px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "field text-foreground",
        )}
      >
        {content}
      </div>
    </div>
  );
}
