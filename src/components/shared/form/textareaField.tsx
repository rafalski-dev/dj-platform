import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { CircleAlert } from "lucide-react";
import { InputProps } from "@/types/formComponents";

export function TextareaField({ name, label, required, error, inputStyles, ...rest }: InputProps) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>
        {label} {required && <span className="text-accent">*</span>}
      </FieldLabel>
      <Textarea name={name} id={name} aria-invalid={!!error} className={inputStyles} {...rest} />
      {error && (
        <FieldError className="flex items-center gap-1.5">
          <CircleAlert size={15} />
          {error}
        </FieldError>
      )}
    </Field>
  );
}
