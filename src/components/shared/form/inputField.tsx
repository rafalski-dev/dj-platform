import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputProps } from "@/types/formComponents";
import { CircleAlert } from "lucide-react";

export function InputField({
  name,
  label,
  required,
  type = "text",
  error,
  inputStyles,
  ...rest
}: InputProps) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>
        {label} {required && <span className="text-accent">*</span>}
      </FieldLabel>
      <Input
        name={name}
        id={name}
        type={type}
        className={inputStyles}
        aria-invalid={!!error}
        {...rest}
      />
      {error && (
        <FieldError className="flex items-center gap-1.5">
          <CircleAlert size={15} />
          {error}
        </FieldError>
      )}
    </Field>
  );
}
