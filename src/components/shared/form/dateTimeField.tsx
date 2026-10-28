"use client";

import { Button } from "@/components/ui/shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { useState } from "react";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/shadcn/field";
import { Required } from "./required";
import { getCurrentYear } from "@/lib/utils";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useLocale } from "next-intl";
import { enUS, pl } from "react-day-picker/locale";

type ControlledDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  startMonth?: Date;
  endMonth?: Date;
};

export function ControlledDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  required,
  startMonth = new Date(),
  endMonth = new Date(getCurrentYear() + 3, 11),
}: ControlledDatePickerProps<T>) {
  const [open, setOpen] = useState<boolean>(false);
  const dateLocale = useLocale() === "pl" ? pl : enUS;
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control, name });

  return (
    <Field data-invalid={invalid}>
      {label && (
        <FieldLabel htmlFor={name}>
          {label}
          {required && <Required />}
        </FieldLabel>
      )}
      <Popover
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) field.onBlur();
        }}
      >
        <PopoverTrigger
          render={
            <Button
              id={name}
              variant="outline"
              aria-invalid={invalid}
              className="bg-background hover:bg-background hover:border-border aria-invalid:border-destructive/60 aria-invalid:ring-destructive/30 aria-invalid:hover:border-destructive/60 dark:aria-invalid:border-destructive/60 dark:aria-invalid:ring-destructive/30 h-11 justify-between px-3.5 text-left text-base font-normal md:h-11 md:text-sm"
            />
          }
        >
          {field.value ? (
            format(field.value, "PPP", { locale: dateLocale })
          ) : (
            <span className="text-muted-foreground/60">{placeholder}</span>
          )}
          <CalendarIcon className="text-accent/60" />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            locale={dateLocale}
            selected={field.value}
            onSelect={(date) => {
              field.onChange(date);
              field.onBlur();
              setOpen(false);
            }}
            captionLayout="dropdown"
            defaultMonth={field.value}
            startMonth={startMonth}
            endMonth={endMonth}
            fixedWeeks
            classNames={{
              outside: "[&_button]:text-muted-foreground/30",
            }}
          />
        </PopoverContent>
      </Popover>
      {invalid && <FieldError>{error?.message}</FieldError>}
    </Field>
  );
}
