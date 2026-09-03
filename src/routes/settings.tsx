import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { GlassPanel } from "@/components/app/GlassPanel";
import {
  AppButton,
  AppInput,
  AppSelect,
  LabeledField,
} from "@/components/ui/field-controls";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Smart Office Assistant" },
      {
        name: "description",
        content:
          "Manage your profile, AI preferences, notifications, appearance and security.",
      },
      { property: "og:title", content: "Settings — Smart Office Assistant" },
      {
        property: "og:description",
        content:
          "Manage your profile, AI preferences, notifications, appearance and security.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-foreground/20",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-glass transition-all",
          checked ? "right-0.5" : "left-0.5",
        )}
      />
    </button>
  );
}

function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [productNotifications, setProductNotifications] = useState(false);
  const [theme, setTheme] = useState("Light");

  return (
    <section>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Configure how Smart Office Assistant works for you."
      />

      <div className="mt-6 space-y-4">
        <GlassPanel>
          <h2 className="text-sm font-semibold">Profile</h2>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-coral to-plum text-sm font-semibold text-primary-foreground">
              AR
            </div>
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <LabeledField label="Name">
                <AppInput defaultValue="Alex Rivera" />
              </LabeledField>
              <LabeledField label="Email">
                <AppInput defaultValue="alex@smartoffice.app" type="email" />
              </LabeledField>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel>
          <h2 className="text-sm font-semibold">AI Preferences</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <LabeledField label="Response style">
              <AppSelect defaultValue="Concise">
                <option>Concise</option>
                <option>Balanced</option>
                <option>Detailed</option>
              </AppSelect>
            </LabeledField>
            <LabeledField label="Preferred response length">
              <AppSelect defaultValue="Medium">
                <option>Short</option>
                <option>Medium</option>
                <option>Long</option>
              </AppSelect>
            </LabeledField>
            <LabeledField label="Tone">
              <AppSelect defaultValue="Professional">
                <option>Professional</option>
                <option>Friendly</option>
                <option>Neutral</option>
              </AppSelect>
            </LabeledField>
          </div>
        </GlassPanel>

        <GlassPanel>
          <h2 className="text-sm font-semibold">Notifications</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email notifications</span>
              <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Product notifications</span>
              <Toggle checked={productNotifications} onChange={setProductNotifications} />
            </div>
          </div>
        </GlassPanel>

        <GlassPanel>
          <h2 className="text-sm font-semibold">Appearance</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Light", "Dark", "System"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTheme(option)}
                className={cn(
                  "rounded-[12px] px-4 py-2 text-sm font-medium transition-colors",
                  theme === option
                    ? "bg-primary text-primary-foreground"
                    : "field text-foreground/60 hover:text-foreground",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <h2 className="text-sm font-semibold">Security</h2>
          <p className="mt-2 text-sm text-foreground/55">
            Password and sign-in options will be available once accounts are enabled.
          </p>
          <AppButton variant="subtle" className="mt-4" disabled>
            Change password
          </AppButton>
        </GlassPanel>
      </div>
    </section>
  );
}
