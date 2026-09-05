import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { GlassPanel } from "@/components/app/GlassPanel";
import { AppButton, AppInput, LabeledField } from "@/components/ui/field-controls";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Set a new password — Smart Office Assistant" },
      {
        name: "description",
        content: "Choose a new password for your Smart Office Assistant account.",
      },
      { property: "og:title", content: "Set a new password — Smart Office Assistant" },
      {
        property: "og:description",
        content: "Choose a new password for your Smart Office Assistant account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setReady(Boolean(data.session)));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (password !== confirm) return setError("Passwords do not match.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return setError(error.message);
    setDone(true);
    setTimeout(() => navigate({ to: "/", replace: true }), 1200);
  }

  return (
    <div className="app-canvas flex min-h-screen items-center justify-center px-4 py-10 text-foreground">
      <div className="w-full max-w-md">
        <GlassPanel className="p-6">
          <h1 className="font-display text-2xl font-medium">Set a new password</h1>
          {!ready ? (
            <p className="mt-3 text-sm text-foreground/55">
              Open this page from the reset link in your email to continue.
            </p>
          ) : done ? (
            <p className="mt-3 text-sm text-foreground/70">
              Password updated. Taking you to your dashboard…
            </p>
          ) : (
            <form className="mt-5 space-y-3" onSubmit={onSubmit}>
              <LabeledField label="New password">
                <AppInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </LabeledField>
              <LabeledField label="Confirm new password">
                <AppInput
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </LabeledField>
              {error ? (
                <p className="rounded-[10px] border border-border/70 bg-coral/15 px-3 py-2 text-sm">
                  {error}
                </p>
              ) : null}
              <AppButton type="submit" className="w-full" disabled={busy}>
                {busy ? "Updating…" : "Update password"}
              </AppButton>
            </form>
          )}
        </GlassPanel>
      </div>
    </div>
  );
}
