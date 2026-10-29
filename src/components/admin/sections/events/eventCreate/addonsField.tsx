import { Field, FieldLabel, FieldTitle } from "@/components/ui/shadcn/field";
import { Addon } from "../../../../../../generated";
import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { FormError } from "@/components/shared/form/formError";
import { CreateEventSchema } from "@/validation/events";

export function AddonsField() {
  const t = useTranslations("Admin.Events.Form.package.addons");
  const addons = Object.values(Addon);
  const { control } = useFormContext<CreateEventSchema>();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name: "package.addons", control });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {addons.map((addon) => {
        return (
          <FieldLabel
            key={addon}
            htmlFor={addon}
            className="not-has-data-checked:hover:border-primary/30 has-data-checked:bg-primary/8 has-data-checked:border-gold-light/50 has-data-checked:ring-primary/8 dark:has-data-checked:bg-primary/8 dark:has-data-checked:border-gold-light/50 dark:has-data-checked:ring-primary/8 bg-background/60 transition-[background-color,border-color,box-shadow] duration-200 ease-out has-data-checked:ring-3 dark:has-data-checked:ring-3"
          >
            <Field orientation="horizontal" className="justify-between gap-3">
              <FieldTitle className="text-foreground">{t(`${addon}.title`)}</FieldTitle>
              <Checkbox
                id={addon}
                name={field.name}
                checked={field.value.includes(addon)}
                onCheckedChange={(checked) => {
                  field.onBlur();
                  if (checked) return field.onChange([...field.value, addon]);
                  field.onChange(field.value.filter((value: string) => value !== addon));
                }}
              />
            </Field>
          </FieldLabel>
        );
      })}
      {invalid && <FormError error={error?.message} className="col-span-3" />}
    </div>
  );
}
