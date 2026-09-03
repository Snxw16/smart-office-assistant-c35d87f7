import { Link, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { navItems } from "./nav-items";
import { cn } from "@/lib/utils";

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <div className="flex items-center gap-2.5 px-5 pt-6 pb-5">
        <div className="grid size-9 place-items-center rounded-[12px] bg-linear-to-br from-coral to-plum text-sm font-semibold text-primary-foreground">
          S
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold tracking-tight">Smart Office</div>
          <div className="text-[13px] font-semibold tracking-tight">Assistant</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-[12px] px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-glass/80 font-semibold text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  : "font-medium text-foreground/60 hover:bg-glass/70 hover:text-foreground",
              )}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
        <div className="flex items-center gap-3 rounded-[14px] bg-glass/60 p-2.5">
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
      <aside className="glass-panel fixed inset-y-0 left-0 z-40 hidden w-64 flex-col rounded-none border-y-0 border-l-0 lg:flex">
        <SidebarBody />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            onClick={onClose}
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          />
          <aside className="glass-panel absolute inset-y-0 left-0 flex w-72 flex-col rounded-none border-y-0 border-l-0 bg-glass/90">
            <button
              aria-label="Close navigation"
              onClick={onClose}
              className="absolute top-5 right-4 grid size-8 place-items-center rounded-[10px] text-foreground/60 hover:bg-glass/70"
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
