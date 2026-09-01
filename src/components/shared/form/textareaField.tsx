import { Field, FieldError, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { ControlledTextareaProps } from "@/types/formComponents";
import { Controller, type FieldValues } from "react-hook-form";

export function ControlledTextarea<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  hint,
  required,
}: ControlledTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldTitle className="justify-between">
            <FieldLabel htmlFor={field.name}>
              {label}
              {required && <span className="text-accent">*</span>}
            </FieldLabel>
            <span className="text-accent items-center text-xs font-light tracking-wider">
              {hint}
            </span>
          </FieldTitle>
          <Textarea
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
            className="max-h-150 min-h-30"
            {...field}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
