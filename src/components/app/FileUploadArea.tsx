import { Upload } from "lucide-react";
import { AppButton } from "@/components/ui/field-controls";

export function FileUploadArea({
  label = "Upload Notes",
  hint = "PDF, DOCX, TXT",
}: {
  label?: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <AppButton variant="subtle" type="button">
        <Upload className="size-4" />
        {label}
      </AppButton>
      <span className="text-xs text-foreground/40">{hint}</span>
    </div>
  );
}
