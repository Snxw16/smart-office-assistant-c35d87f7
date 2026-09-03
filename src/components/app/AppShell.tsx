import { useState, type ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

export function AppShell({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="app-canvas relative min-h-screen w-full text-foreground">
      <div className="pointer-events-none fixed -top-24 -left-16 size-[420px] rounded-full bg-coral/30 blur-3xl" />
      <div className="pointer-events-none fixed top-1/3 -right-20 size-[440px] rounded-full bg-sky/30 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-24 left-1/4 size-[380px] rounded-full bg-plum/25 blur-3xl" />

      <div className="relative z-10 flex min-h-screen">
        <AppSidebar open={navOpen} onClose={() => setNavOpen(false)} />

        <main className="min-w-0 flex-1 lg:pl-64">
          <AppHeader onOpenNav={() => setNavOpen(true)} />
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
