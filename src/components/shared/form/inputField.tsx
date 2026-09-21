import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { ControlledInputProps } from "@/types/formComponents";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, type FieldValues } from "react-hook-form";

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  autoComplete = "off",
  required,
  forgotPassword,
}: ControlledInputProps<T>) {
  const t = useTranslations("Auth");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const eyeStroke = 1.4;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor={field.name}>
              {label}
              {required && <span className="text-accent self-start">*</span>}
            </FieldLabel>
            {forgotPassword && (
              <Link
                className="text-accent-foreground hover:text-accent-foreground/90 duration-200"
                href="/reset-password"
              >
                {t("Login.forgot-password")}
              </Link>
            )}
          </div>
          <div className="relative">
            <Input
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete={autoComplete}
              type={isPasswordShown ? "text" : type}
              {...field}
            />
            {type === "password" && (
              <Button
                type="button"
                variant="input"
                size="icon-md"
                className="absolute top-1/2 right-4 -translate-y-1/2"
                onClick={() => setIsPasswordShown((prev) => !prev)}
              >
                {isPasswordShown ? (
                  <EyeOffIcon strokeWidth={eyeStroke} />
                ) : (
                  <EyeIcon strokeWidth={eyeStroke} />
                )}
              </Button>
            )}
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
