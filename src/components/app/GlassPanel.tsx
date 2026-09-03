import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
  soft = false,
}: {
  children: ReactNode;
  className?: string;
  soft?: boolean;
}) {
  return (
    <div className={cn(soft ? "glass-soft" : "glass-panel", "rounded-[16px] p-5 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function SectionPanel({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <GlassPanel soft className={className ?? ""}>
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </GlassPanel>

  );
}
