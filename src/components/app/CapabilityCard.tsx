import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "coral" | "mint" | "sky";

const toneStyles: Record<Tone, { icon: string; border: string; cta: string }> = {
  coral: {
    icon: "bg-coral/25 text-foreground",
    border: "hover:border-coral/50",
    cta: "group-hover:text-coral",
  },
  mint: {
    icon: "bg-mint/25 text-foreground",
    border: "hover:border-mint/50",
    cta: "group-hover:text-mint",
  },
  sky: {
    icon: "bg-sky/25 text-foreground",
    border: "hover:border-sky/50",
    cta: "group-hover:text-sky",
  },
};

export function CapabilityCard({
  to,
  icon: Icon,
  title,
  description,
  cta,
  tone,
  className,
}: {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  tone: Tone;
  className?: string;
}) {
  const styles = toneStyles[tone];
  return (
    <Link
      to={to}
      className={cn(
        "glass-panel group flex min-h-52 flex-col rounded-[16px] p-5 shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-glass/80 hover:shadow-md",
        styles.border,
        className,
      )}
    >
      <div className={cn("grid size-10 place-items-center rounded-[10px]", styles.icon)}>
        <Icon className="size-[18px]" strokeWidth={1.8} />
      </div>
      <h3 className="mt-4 text-[15px] font-bold">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/55">{description}</p>
      <span
        className={cn(
          "mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-bold text-foreground transition-colors",
          styles.cta,
        )}
      >
        {cta}
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
