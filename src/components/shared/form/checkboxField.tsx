import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldLabel, FieldError } from "@/components/ui/field";

type CheckboxDescriptionProps = {
  label: string;
  description?: string;
  name: string;
  error: string | null;
};

export function CheckboxField({ label, name, error }: CheckboxDescriptionProps) {
  return (
    <Field orientation="horizontal">
      <Checkbox name={name} id="termsCheckbox" />
      <FieldContent>
        <FieldLabel htmlFor="termsCheckbox" className="text-muted-foreground/80 text-[13.5px]">
          {label}
        </FieldLabel>
        <FieldError>{error}</FieldError>
      </FieldContent>
    </Field>
  );
}
