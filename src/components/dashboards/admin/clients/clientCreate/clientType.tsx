import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BuildingIcon, UserIcon } from "lucide-react";
import { useController, useFormContext } from "react-hook-form";
import { FormSection } from "./formSection";
import { useTranslations } from "next-intl";

const CLIENT_TYPE = [
  {
    value: "Individual",
    tags: ["fullName", "privateAddress", "idCard"],
    icon: <UserIcon strokeWidth={1.8} size={20} />,
  },
  {
    value: "Business",
    tags: ["companyName", "companyAddress", "taxId"],
    icon: <BuildingIcon strokeWidth={1.8} size={20} />,
  },
];

export function ClientType() {
  const { control } = useFormContext();
  const { field } = useController({ name: "clientType", control });
  const t = useTranslations("Admin.Clients.Create.clientType");
  return (
    <FormSection title={t("title")} description={t("description")}>
      <RadioGroup
        aria-label={t("title")}
        className="sm:grid-cols-2"
        value={field.value ?? ""}
        onValueChange={field.onChange}
      >
        {CLIENT_TYPE.map(({ value, tags, icon }) => (
          <FieldLabel
            key={value}
            className="not-has-data-checked:hover:border-primary/30 has-data-checked:bg-primary/8 has-data-checked:border-gold-light/50 has-data-checked:ring-primary/8 dark:has-data-checked:bg-primary/8 dark:has-data-checked:border-gold-light/50 dark:has-data-checked:ring-primary/8 bg-background/60 rounded-2xl! p-2 transition-[background-color,border-color,box-shadow] duration-200 ease-out has-data-checked:ring-3 dark:has-data-checked:ring-3"
          >
            <Field className="gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-muted-foreground group-has-data-checked/field-label:from-gold-light group-has-data-checked/field-label:to-gold-dark group-has-data-checked/field-label:text-primary-foreground bg-gold-light/6 flex size-11 items-center justify-center rounded-lg transition-colors duration-200 ease-out group-has-data-checked/field-label:bg-linear-120">
                  {icon}
                </div>
                <RadioGroupItem value={value} />
              </div>
              <FieldContent className="gap-1">
                <FieldTitle className="text-foreground text-base font-bold">
                  {t(`options.${value}.title`)}
                </FieldTitle>
                <FieldDescription className="text-subtle-foreground text-[13px]">
                  {t(`options.${value}.description`)}
                </FieldDescription>
              </FieldContent>
              <div className="flex flex-row flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="text-muted-foreground rounded-full border px-[9px] py-1 text-[11.5px]"
                  >
                    {t(`tags.${tag}`)}
                  </div>
                ))}
              </div>
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FormSection>
  );
}
