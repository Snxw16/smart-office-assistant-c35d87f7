import { Menu } from "lucide-react";
import { SearchField, AppButton } from "@/components/ui/field-controls";
import { UserMenu } from "./UserMenu";

export function AppHeader({ onOpenNav }: { onOpenNav: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/70 bg-glass/55 px-4 backdrop-blur-lg sm:px-6 lg:px-10">
      <button
        aria-label="Open navigation"
        onClick={onOpenNav}
        className="grid size-9 shrink-0 place-items-center rounded-[10px] border border-border/70 bg-glass/75 shadow-sm transition-colors hover:bg-glass lg:hidden"
      >
        <Menu className="size-4" />
      </button>

      <SearchField
        className="hidden min-w-0 max-w-lg flex-1 sm:block"
        placeholder="Search meetings, research, chats…"
        aria-label="Search workspace"
      />

      <div className="ml-auto flex items-center gap-2">
        <AppButton className="hidden sm:inline-flex">New</AppButton>
        <UserMenu />
      </div>
    </header>
  );
}
