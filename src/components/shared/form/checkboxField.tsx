import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/shadcn/field";
import { ControlledCheckboxProps } from "@/types/form";
import { useController, type FieldValues } from "react-hook-form";

export function ControlledCheckbox<T extends FieldValues>({
  name,
  control,
  label,
}: ControlledCheckboxProps<T>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <div className="mt-3 flex flex-col gap-1">
      <Field className="items-start" orientation="horizontal" data-invalid={invalid}>
        <Checkbox
          className="mt-0.5"
          id={field.name}
          name={field.name}
          checked={field.value}
          onCheckedChange={field.onChange}
          aria-invalid={invalid}
        />
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      </Field>
      {invalid && <FieldError errors={[error]} />}
    </div>
  );
}
