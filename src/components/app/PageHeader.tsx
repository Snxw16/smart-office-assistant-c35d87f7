import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        {eyebrow ? (
          <div className="text-[11px] font-semibold tracking-[0.18em] text-foreground/40 uppercase">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-foreground/55">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
