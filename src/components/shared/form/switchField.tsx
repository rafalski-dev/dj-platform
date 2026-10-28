import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/shadcn/field";
import { Switch } from "@/components/ui/shadcn/switch";
import { ControlledSwitchProps } from "@/types/form";
import { useController, type FieldValues } from "react-hook-form";

export function ControlledSwitch<T extends FieldValues>({
  name,
  control,
  label,
  description,
}: ControlledSwitchProps<T>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });
  const { ref } = field;

  return (
    <Field orientation="horizontal" className="items-start gap-4" data-invalid={invalid}>
      <FieldContent>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        <FieldDescription className="text-xs">{description}</FieldDescription>
        {invalid && <FieldError>{error?.message}</FieldError>}
      </FieldContent>
      <Switch
        id={field.name}
        name={field.name}
        ref={ref}
        onBlur={field.onBlur}
        checked={field.value ?? false}
        onCheckedChange={field.onChange}
        aria-invalid={invalid}
      />
    </Field>
  );
}
