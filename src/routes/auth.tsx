import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { GlassPanel } from "@/components/app/GlassPanel";
import { AppButton, AppInput, LabeledField } from "@/components/ui/field-controls";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — Smart Office Assistant" },
      {
        name: "description",
        content:
          "Sign in or create your Smart Office Assistant account to access meetings, research and chat.",
      },
      { property: "og:title", content: "Sign in — Smart Office Assistant" },
      {
        property: "og:description",
        content:
          "Sign in or create your Smart Office Assistant account to access meetings, research and chat.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/", replace: true });
    });
  }, [navigate]);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setNotice(null);
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/", replace: true });
      } else if (mode === "signup") {
        if (password !== confirm) throw new Error("Passwords do not match.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        if (data.session) {
          navigate({ to: "/", replace: true });
        } else {
          setNotice("Account created. Check your email to confirm before signing in.");
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setNotice("If that email exists, a reset link is on its way.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="app-canvas flex min-h-screen items-center justify-center px-4 py-10 text-foreground">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-glass/80 bg-linear-to-br from-coral/85 to-plum/85 text-sm font-bold text-primary-foreground shadow-sm">
            S
          </div>
          <div className="leading-[1.15]">
            <div className="text-sm font-bold">Smart Office</div>
            <div className="text-sm font-bold">Assistant</div>
          </div>
        </div>

        <GlassPanel className="p-6">
          <h1 className="font-display text-2xl font-medium">
            {mode === "signin"
              ? "Sign in"
              : mode === "signup"
                ? "Create your account"
                : "Reset your password"}
          </h1>
          <p className="mt-2 text-sm text-foreground/55">
            {mode === "signin"
              ? "Welcome back to your intelligent workspace."
              : mode === "signup"
                ? "Set up your workspace in a few seconds."
                : "We'll email you a link to set a new password."}
          </p>

          <form className="mt-5 space-y-3" onSubmit={onSubmit}>
            {mode === "signup" ? (
              <LabeledField label="Full name">
                <AppInput
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </LabeledField>
            ) : null}

            <LabeledField label="Email">
              <AppInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </LabeledField>

            {mode !== "forgot" ? (
              <LabeledField label="Password">
                <AppInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  required
                />
              </LabeledField>
            ) : null}

            {mode === "signup" ? (
              <LabeledField label="Confirm password">
                <AppInput
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </LabeledField>
            ) : null}

            {error ? (
              <p className="rounded-[10px] border border-border/70 bg-coral/15 px-3 py-2 text-sm text-foreground">
                {error}
              </p>
            ) : null}
            {notice ? (
              <p className="rounded-[10px] border border-border/70 bg-mint/20 px-3 py-2 text-sm text-foreground">
                {notice}
              </p>
            ) : null}

            <AppButton type="submit" className={cn("w-full")} disabled={busy}>
              {busy
                ? "Please wait…"
                : mode === "signin"
                  ? "Sign In"
                  : mode === "signup"
                    ? "Create Account"
                    : "Send reset link"}
            </AppButton>
          </form>

          <div className="mt-4 space-y-2 text-sm text-foreground/60">
            {mode === "signin" ? (
              <>
                <button
                  type="button"
                  className="font-medium text-foreground/70 hover:text-foreground"
                  onClick={() => switchMode("forgot")}
                >
                  Forgot password?
                </button>
                <div>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="font-semibold text-foreground hover:underline"
                    onClick={() => switchMode("signup")}
                  >
                    Create account
                  </button>
                </div>
              </>
            ) : (
              <div>
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-semibold text-foreground hover:underline"
                  onClick={() => switchMode("signin")}
                >
                  Sign in
                </button>
              </div>
            )}
          </div>
        </GlassPanel>

        <p className="mt-5 text-center text-xs text-foreground/45">
          <Link to="/auth">Smart Office Assistant</Link>
        </p>
      </div>
    </div>
  );
}
