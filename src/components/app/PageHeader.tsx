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
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <div className="text-[10px] font-bold tracking-[0.16em] text-foreground/45 uppercase">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="mt-1.5 font-display text-3xl font-medium text-balance sm:text-[2.125rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-foreground/55">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
