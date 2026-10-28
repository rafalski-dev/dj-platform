"use client";

import { Required } from "@/components/shared/form/required";
import { Field, FieldError, FieldLabel } from "@/components/ui/shadcn/field";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { cn } from "@/lib/utils";
import { Control, Path, useController, type FieldValues } from "react-hook-form";

type ControlledTextareaType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  counter?: number;
  className?: string;
};

export function ControlledTextarea<T extends FieldValues>({
  name,
  control,
  label,
  hint,
  required,
  counter,
  className,
  ...inputProps
}: ControlledTextareaType<T>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });
  const { ref } = field;

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={name}>
        <div className="flex w-full flex-row items-center justify-between">
          <div>
            {label}
            {required && <Required />}
          </div>
          {hint && <div className="text-accent-foreground text-xs">{hint}</div>}
        </div>
      </FieldLabel>
      <div className="relative">
        <Textarea
          aria-invalid={invalid}
          id={name}
          name={field.name}
          value={field.value}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
          onBlur={field.onBlur}
          ref={ref}
          className={cn(counter && "pb-6", className)}
          {...inputProps}
        />
        {counter && (
          <span className="text-popover-foreground absolute right-2 bottom-2 text-end text-xs">
            {field.value.length} / {counter}
          </span>
        )}
      </div>
      {invalid && <FieldError>{error?.message}</FieldError>}
    </Field>
  );
}
