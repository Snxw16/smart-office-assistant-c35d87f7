import { Link, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { navItems } from "./nav-items";
import { cn } from "@/lib/utils";

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <div className="flex items-center gap-3 px-5 pt-6 pb-7">
        <div className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-glass/80 bg-linear-to-br from-coral/85 to-plum/85 text-sm font-bold text-primary-foreground shadow-sm">
          S
        </div>
        <div className="min-w-0 leading-[1.15]">
          <div className="truncate text-sm font-bold">Smart Office</div>
          <div className="truncate text-sm font-bold">Assistant</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Primary navigation">
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-[10px] border px-3 py-2.5 text-sm transition-[background-color,border-color,color,box-shadow] duration-150",
                active
                  ? "border-glass/90 bg-glass/80 font-semibold text-foreground shadow-sm"
                  : "border-transparent font-medium text-foreground/60 hover:border-glass/60 hover:bg-glass/45 hover:text-foreground",
              )}
            >
              <item.icon className="size-[18px] shrink-0" strokeWidth={1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
        <div className="flex items-center gap-3 rounded-[12px] border border-glass/70 bg-glass/45 p-2.5">
          <div className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-sky to-plum text-xs font-semibold text-primary-foreground">
            AR
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[13px] font-semibold">Alex Rivera</div>
            <div className="truncate text-xs text-foreground/50">alex@smartoffice.app</div>
          </div>
        </div>
      </div>
    </>
  );
}

export function AppSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <aside className="glass-panel fixed inset-y-0 left-0 z-40 hidden w-64 flex-col rounded-none border-y-0 border-l-0 shadow-sm lg:flex">
        <SidebarBody />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            onClick={onClose}
            className="absolute inset-0 bg-foreground/20 backdrop-blur-[2px]"
          />
          <aside className="glass-panel absolute inset-y-0 left-0 flex w-[min(19rem,86vw)] flex-col rounded-none border-y-0 border-l-0 bg-glass/95 shadow-xl">
            <button
              aria-label="Close navigation"
              onClick={onClose}
              className="absolute top-6 right-4 grid size-8 place-items-center rounded-[9px] text-foreground/60 transition-colors hover:bg-glass/70 hover:text-foreground"
            >
              <X className="size-4" />
            </button>
            <SidebarBody onNavigate={onClose} />
          </aside>
        </div>
      ) : null}
    </>
  );
}
