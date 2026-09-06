import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Settings as SettingsIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentUser, initials } from "@/hooks/use-profile";

export function useSignOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };
}

export function UserMenu() {
  const { data: user } = useCurrentUser();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const name = user?.fullName || user?.email || "";
  const email = user?.email ?? "";

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-glass bg-plum/70 text-xs font-semibold text-foreground shadow-sm transition-colors hover:bg-plum/85"
      >
        {user ? initials(user.fullName, user.email) : ""}
      </button>

      {open ? (
        <div
          role="menu"
          className="glass-panel absolute right-0 z-50 mt-2 w-60 rounded-[14px] p-2 shadow-lg"
        >
          <div className="px-3 py-2 leading-tight">
            <div className="truncate text-[13px] font-semibold">{name}</div>
            <div className="truncate text-xs text-foreground/55">{email}</div>
          </div>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              navigate({ to: "/settings" });
            }}
            className="flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-sm text-foreground/75 transition-colors hover:bg-glass/70 hover:text-foreground"
          >
            <SettingsIcon className="size-4" /> Settings
          </button>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              void signOut();
            }}
            className="flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-sm text-foreground/75 transition-colors hover:bg-glass/70 hover:text-foreground"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
