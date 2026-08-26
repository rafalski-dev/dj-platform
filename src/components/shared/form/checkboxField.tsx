import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldLabel, FieldError } from "@/components/ui/field";
import { CheckboxDescriptionProps } from "@/types/formComponents";

export function CheckboxField({ label, name, error, fieldStyle }: CheckboxDescriptionProps) {
  return (
    <Field orientation="horizontal" className={fieldStyle}>
      <Checkbox name={name} id={name} />
      <FieldContent>
        <FieldLabel htmlFor={name} className="text-muted-foreground/80 text-[13.5px]">
          {label}
        </FieldLabel>
        {error && <FieldError>{error}</FieldError>}
      </FieldContent>
    </Field>
  );
}
