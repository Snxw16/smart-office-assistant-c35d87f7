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
        "glass-panel group rounded-[20px] p-5 transition-colors hover:bg-glass/75",
        styles.border,
        className,
      )}
    >
      <div className={cn("grid size-11 place-items-center rounded-[14px]", styles.icon)}>
        <Icon className="size-5" />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-foreground/55">{description}</p>
      <span
        className={cn(
          "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors",
          styles.cta,
        )}
      >
        {cta}
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
