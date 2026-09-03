import { cn } from "@/lib/utils";

export function FilterTabs({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
            option === value
              ? "bg-primary text-primary-foreground"
              : "field text-foreground/60 hover:text-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
