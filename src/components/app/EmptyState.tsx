import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-[12px] border border-dashed border-foreground/15 bg-glass/35 px-6 py-8 text-center",
        className,
      )}
    >
      <div className="grid size-10 place-items-center rounded-[10px] bg-plum/15">
        <Icon className="size-[18px] text-foreground/65" strokeWidth={1.8} />
      </div>
      <p className="mt-3 text-[15px] font-semibold">{title}</p>
      <p className="mt-1 max-w-[44ch] text-sm text-foreground/50">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
