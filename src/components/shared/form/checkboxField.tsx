import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ControlledCheckboxProps } from "@/types/formComponents";
import { Controller, type FieldValues } from "react-hook-form";

export function ControlledCheckbox<T extends FieldValues>({
  name,
  control,
  label,
}: ControlledCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="mt-3 flex flex-col gap-1">
          <Field className="items-start" orientation="horizontal" data-invalid={fieldState.invalid}>
            <Checkbox
              className="mt-0.5"
              id={field.name}
              name={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-invalid={fieldState.invalid}
            />
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          </Field>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </div>
      )}
    />
  );
}
