"use client";

import { Required } from "@/components/other/required";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Control, Path, useController, type FieldValues } from "react-hook-form";

type ControlledTextareaType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

export function ControlledTextarea<T extends FieldValues>({
  name,
  control,
  label,
  hint,
  required,
  ...inputProps
}: ControlledTextareaType<T>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={name}>
        <div>
          <div>
            {label}
            {required && <Required />}
          </div>
          {hint && <div>{hint}</div>}
        </div>
      </FieldLabel>
      <Textarea aria-invalid={invalid} id={name} {...field} {...inputProps} />
      {invalid && <FieldError>{error?.message}</FieldError>}
    </Field>
  );
}
