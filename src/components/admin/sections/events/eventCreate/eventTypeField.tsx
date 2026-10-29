"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/shadcn/field";
import { useController, useFormContext } from "react-hook-form";

import {
  BriefcaseBusinessIcon,
  CakeIcon,
  GraduationCapIcon,
  HeartIcon,
  MusicIcon,
  PresentationIcon,
  SparklesIcon,
  WineIcon,
} from "lucide-react";
import { FormError } from "@/components/shared/form/formError";
import { EventType } from "../../../../../../generated";
import { useTranslations } from "next-intl";
import { CreateEventSchema } from "@/validation/events";

const eventTypeData: { key: EventType; icon: React.ReactNode }[] = [
  { key: "Wedding", icon: <HeartIcon strokeWidth={1.8} size={20} /> },
  { key: "Prom", icon: <GraduationCapIcon strokeWidth={1.8} size={20} /> },
  { key: "Anniversary", icon: <WineIcon strokeWidth={1.8} size={20} /> },
  { key: "Birthday_18", icon: <CakeIcon strokeWidth={1.8} size={20} /> },
  { key: "Conference", icon: <PresentationIcon strokeWidth={1.8} size={20} /> },
  { key: "Corporate_Event", icon: <BriefcaseBusinessIcon strokeWidth={1.8} size={20} /> },
  { key: "Festival", icon: <MusicIcon strokeWidth={1.8} size={20} /> },
  { key: "Other", icon: <SparklesIcon strokeWidth={1.8} size={20} /> },
];

export function EventTypeField() {
  const t = useTranslations("Admin.Events.Form");

  const { control, setValue } = useFormContext<CreateEventSchema>();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control, name: "eventType.type" });

  return (
    <RadioGroup
      {...field}
      value={field.value ?? null}
      onValueChange={(type) => {
        field.onChange(type);
        setValue("eventType.altType", "");
        setValue("dateAndPlace.weddingKind", undefined);
      }}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {eventTypeData.map(({ key, icon }) => {
          return (
            <FieldLabel
              key={key}
              className="not-has-data-checked:hover:border-primary/30 has-data-checked:bg-primary/8 has-data-checked:border-gold-light/50 has-data-checked:ring-primary/8 dark:has-data-checked:bg-primary/8 dark:has-data-checked:border-gold-light/50 dark:has-data-checked:ring-primary/8 bg-background/60 rounded-2xl! p-2 transition-[background-color,border-color,box-shadow] duration-200 ease-out has-data-checked:ring-3 dark:has-data-checked:ring-3"
            >
              <Field className="gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-muted-foreground group-has-data-checked/field-label:from-gold-light group-has-data-checked/field-label:to-gold-dark group-has-data-checked/field-label:text-primary-foreground bg-gold-light/6 flex size-11 items-center justify-center rounded-lg transition-colors duration-200 ease-out group-has-data-checked/field-label:bg-linear-120">
                    {icon}
                  </div>
                  <RadioGroupItem value={key} />
                </div>
                <FieldContent className="gap-1">
                  <FieldTitle className="text-foreground text-base font-bold">
                    {t(`eventTypes.${key}.title`)}
                  </FieldTitle>
                  <FieldDescription className="text-subtle-foreground text-[13px]">
                    {t(`eventTypes.${key}.description`)}
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          );
        })}
      </div>
      {invalid && <FormError error={error?.message} />}
    </RadioGroup>
  );
}
