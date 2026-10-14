import { Required } from "@/components/other/required";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { type Control, FieldValues, Path, useController } from "react-hook-form";

type ControlledSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  items: { value: string; label: string }[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  width?: string;
};

export function ControlledSelect<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  items,
  required,
  width,
}: ControlledSelectProps<T>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Field data-invalid={invalid} className={cn("", width)}>
      <FieldLabel htmlFor={field.name}>
        {label}
        {required && <Required />}
      </FieldLabel>
      <Select
        name={field.name}
        value={field.value ?? ""}
        onValueChange={field.onChange}
        inputRef={field.ref}
        items={items}
      >
        <SelectTrigger aria-invalid={invalid} id={field.name}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map(({ value, label }) => {
              return (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {invalid && <FieldError>{error?.message}</FieldError>}
    </Field>
  );
}
