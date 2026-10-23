"use client";

import { InputLink } from "@/components/shared/form/inputLink";
import { Required } from "@/components/shared/form/required";
import { Button } from "@/components/ui/shadcn/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/shadcn/field";
import { Input } from "@/components/ui/shadcn/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type ControlledInputType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel";
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  required?: boolean;
};

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  required,
  type = "text",
  autoComplete = "off",
  ...inputProps
}: ControlledInputType<T>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Field data-invalid={invalid}>
      {label && (
        <FieldLabel htmlFor={name}>
          {label}
          {required && <Required />}
        </FieldLabel>
      )}
      <Input
        {...inputProps}
        {...field}
        type={type}
        aria-invalid={invalid}
        id={name}
        autoComplete={autoComplete}
      />
      {invalid && <FieldError>{error?.message}</FieldError>}
    </Field>
  );
}

type ControlledPasswordInputType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel";
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  required?: boolean;
  forgotPassword?: boolean;
};

export function ControlledPasswordInput<T extends FieldValues>({
  name,
  control,
  label,
  forgotPassword,
  ...inputProps
}: ControlledPasswordInputType<T>) {
  const [isOn, setIsOn] = useState(false);
  const t = useTranslations("Auth.PasswordInput");

  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Field data-invalid={invalid}>
      {label && (
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          {forgotPassword && <InputLink pathname="/reset-password" />}
        </div>
      )}

      <div className="relative">
        <Input
          aria-invalid={invalid}
          id={name}
          {...field}
          {...inputProps}
          type={isOn ? "text" : "password"}
        />
        <Button
          className="text-accent/60 absolute inset-y-0 right-2 my-auto [&_svg:not([class*='size-'])]:size-4.5"
          size="icon-md"
          variant="ghost"
          aria-label={isOn ? t("hide") : t("show")}
          onClick={() => setIsOn((prev) => !prev)}
        >
          {isOn ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      </div>
      {invalid && <FieldError>{error?.message}</FieldError>}
    </Field>
  );
}
