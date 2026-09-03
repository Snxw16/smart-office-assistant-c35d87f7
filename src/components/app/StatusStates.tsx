import { AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingState({ label = "Working…", className }: { label?: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 rounded-[16px] border border-dashed border-foreground/15 bg-glass/40 px-6 py-8 text-sm text-foreground/60",
        className,
      )}
    >
      <Loader2 className="size-4 animate-spin" />
      {label}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description,
  className,
}: {
  title?: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[16px] border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm",
        className,
      )}
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-foreground/60">{description}</p>
      </div>
    </div>
  );
}

export function SkeletonRow({ className }: { className?: string }) {
  return <div className={cn("h-4 animate-pulse rounded-full bg-foreground/10", className)} />;
}
