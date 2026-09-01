import { FieldError } from "@/components/ui/field";
import { CircleAlert } from "lucide-react";

export function ContactFormError({ error }: { error: string | null }) {
  return (
    <FieldError className="border-destructive/60 bg-destructive/3 mt-2 flex gap-2 rounded-lg border px-4 py-3 text-[13.5px]">
      <CircleAlert size={18} />
      {error}
    </FieldError>
  );
}
