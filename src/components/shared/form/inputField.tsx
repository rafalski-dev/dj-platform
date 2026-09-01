import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ControlledInputProps } from "@/types/formComponents";
import { Controller, type FieldValues } from "react-hook-form";

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  autoComplete = "off",
  required,
}: ControlledInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label}
            {required && <span className="text-accent">*</span>}
          </FieldLabel>
          <Input
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete={autoComplete}
            type={type}
            {...field}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
