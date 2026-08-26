import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@/types/formComponents";
import { CircleAlert } from "lucide-react";

export function SelectField({ name, label, items, required, error }: SelectProps) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>
        {label} {required && <span className="text-accent">*</span>}
      </FieldLabel>
      <Select items={items} name={name}>
        <SelectTrigger id={name} aria-invalid={!!error}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map(({ label, value }) => {
              return (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && (
        <FieldError className="flex items-center gap-1.5">
          <CircleAlert size={15} />
          {error}
        </FieldError>
      )}
    </Field>
  );
}
