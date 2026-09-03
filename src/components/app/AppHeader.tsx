import { Menu } from "lucide-react";
import { SearchField, AppButton } from "@/components/ui/field-controls";

export function AppHeader({ onOpenNav }: { onOpenNav: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-glass/50 bg-glass/35 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-10">
      <button
        aria-label="Open navigation"
        onClick={onOpenNav}
        className="grid size-9 place-items-center rounded-[12px] bg-glass/70 lg:hidden"
      >
        <Menu className="size-4" />
      </button>

      <SearchField
        className="hidden min-w-0 max-w-md flex-1 sm:block"
        placeholder="Search meetings, research, chats…"
        aria-label="Search workspace"
      />

      <div className="ml-auto flex items-center gap-2">
        <AppButton className="hidden sm:inline-flex">New</AppButton>
        <div className="grid size-9 place-items-center rounded-full bg-linear-to-br from-coral to-plum text-xs font-semibold text-primary-foreground">
          AR
        </div>
      </div>
    </header>
  );
}
