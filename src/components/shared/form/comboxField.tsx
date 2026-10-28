"use client";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/shadcn/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/shadcn/field";
import { Required } from "./required";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useTranslations } from "next-intl";

type ControlledSearchSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  items: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  onSelect?: (arg: { label: string; value: string }) => void;
};

export function ControlledSearchSelect<T extends FieldValues>({
  name,
  control,
  label,
  items,
  placeholder,
  required,
  onSelect,
}: ControlledSearchSelectProps<T>) {
  const t = useTranslations("Admin.EmptyState.noResults");
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control, name });
  const { ref } = field;

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={field.name}>
        {label}
        {required && <Required />}
      </FieldLabel>
      <Combobox
        id={field.name}
        name={field.name}
        items={items}
        value={field.value ?? null}
        onValueChange={(item) => {
          field.onChange(item);
          field.onBlur();
          if (item && onSelect) onSelect(item);
        }}
      >
        <ComboboxInput placeholder={placeholder} aria-invalid={invalid} ref={ref} />
        <ComboboxContent>
          <ComboboxEmpty>{t("title")}</ComboboxEmpty>
          <ComboboxList>
            {(client) => (
              <ComboboxItem key={client.value} value={client}>
                {client.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {invalid && <FieldError>{error?.message}</FieldError>}
    </Field>
  );
}
