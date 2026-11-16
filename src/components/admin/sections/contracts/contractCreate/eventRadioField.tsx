"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/shadcn/field";
import { Control, useController } from "react-hook-form";
import { useFormatter, useTranslations } from "next-intl";
import { FormError } from "@/components/shared/form/formError";
import { CreateContractSchema } from "@/validation/contracts";
import type { ClientWithEvents } from "@/data/contracts";

type EventRadioFieldProps = {
  control: Control<CreateContractSchema>;
  events: ClientWithEvents["events"] | undefined;
};

export function EventRadioField({ control, events }: EventRadioFieldProps) {
  const t = useTranslations("Admin.Contracts.Form.event");
  const format = useFormatter();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control, name: "event" });

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{t("label")}</p>

      {!events ? (
        <p className="text-subtle-foreground text-sm">{t("noClient")}</p>
      ) : (
        <RadioGroup
          name={field.name}
          inputRef={field.ref}
          value={field.value ?? null}
          onValueChange={(value) => {
            field.onChange(value);
            field.onBlur();
          }}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {events.map(({ id, name, date }) => (
              <FieldLabel
                key={id}
                className="not-has-data-checked:hover:border-primary/30 has-data-checked:bg-primary/8 has-data-checked:border-gold-light/50 has-data-checked:ring-primary/8 dark:has-data-checked:bg-primary/8 dark:has-data-checked:border-gold-light/50 dark:has-data-checked:ring-primary/8 bg-background/60 rounded-2xl! p-2 transition-[background-color,border-color,box-shadow] duration-200 ease-out has-data-checked:ring-3 dark:has-data-checked:ring-3"
              >
                <Field orientation="horizontal">
                  <FieldContent className="gap-1">
                    <FieldTitle className="text-foreground font-bold">{name}</FieldTitle>
                    <FieldDescription className="text-subtle-foreground text-[13px]">
                      {format.dateTime(date, { dateStyle: "long" })}
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={id} />
                </Field>
              </FieldLabel>
            ))}
          </div>
        </RadioGroup>
      )}

      {invalid && <FormError error={error?.message} />}
    </div>
  );
}
