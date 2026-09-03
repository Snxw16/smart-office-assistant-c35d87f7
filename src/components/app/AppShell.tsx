import { useState, type ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

export function AppShell({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="app-canvas relative min-h-screen w-full text-foreground">
      <div className="relative z-10 flex min-h-screen">
        <AppSidebar open={navOpen} onClose={() => setNavOpen(false)} />

        <main className="min-w-0 flex-1 lg:pl-64">
          <AppHeader onOpenNav={() => setNavOpen(true)} />
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-9">{children}</div>
        </main>
      </div>
    </div>
  );
}
