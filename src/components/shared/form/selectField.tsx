import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControlledSelectProps } from "@/types/formComponents";
import { Controller, type FieldValues } from "react-hook-form";

export function ControlledSelect<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  list,
  required,
}: ControlledSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>
            {label}
            {required && <span className="text-accent">*</span>}
          </FieldLabel>
          <Select items={list} name={field.name} value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {list.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
