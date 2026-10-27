import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { ControlledSearchSelect } from "@/components/shared/form/comboxField";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card";

import { useCreateEventContext } from "@/hooks/useCreateEventContext";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";

export function BasicDetailsStep({ clientsList }) {
  const t = useTranslations("Admin.Events.Form");
  const { setCurrentStep } = useCreateEventContext();
  const { control } = useFormContext();
  const type = useWatch({ name: "eventType.type" });

  const mappedClients = clientsList.map(({ id, name }) => {
    return { label: name, value: id };
  });

  return (
    <Card>
      <GeneralCardHeader title={t("steps.basics")} />
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row">
          <ControlledSearchSelect
            name="basics.client"
            control={control}
            label={t("basics.client.label")}
            placeholder={t("basics.client.placeholder")}
            items={mappedClients}
          />
          <div className="md:w-44 md:shrink-0">
            <ControlledInput
              name="basics.guestCount"
              control={control}
              type="number"
              label={t("basics.guests.label")}
              placeholder={t("basics.guests.placeholder")}
            />
          </div>
        </div>

        {type === "Wedding" && <WeddingFields />}
      </CardContent>
      <CardFooter className="mx-(--card-spacing) flex justify-between border-t px-0">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep((prev) => prev - 1)}>
          {t("navigation.prev")}
        </Button>
        <Button size="sm" onClick={() => setCurrentStep((prev) => prev + 1)}>
          {t("navigation.next")}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function WeddingFields() {
  const t = useTranslations("Admin.Events.Form.basics.wedding");
  const { control } = useFormContext();
  return (
    <div className="flex flex-col gap-6 border-t pt-6">
      <FieldGroup title={t("groups.couple")}>
        <ControlledInput
          name="basics.wedding.bride"
          control={control}
          label={t("bride")}
          placeholder={t("fullNamePlaceholder")}
        />
        <ControlledInput
          name="basics.wedding.groom"
          control={control}
          label={t("groom")}
          placeholder={t("fullNamePlaceholder")}
        />
      </FieldGroup>
      <FieldGroup title={t("groups.witnesses")}>
        <ControlledInput
          name="basics.wedding.brideWitness"
          control={control}
          label={t("brideWitness")}
          placeholder={t("fullNamePlaceholder")}
        />
        <ControlledInput
          name="basics.wedding.groomWitness"
          control={control}
          label={t("groomWitness")}
          placeholder={t("fullNamePlaceholder")}
        />
      </FieldGroup>
      <FieldGroup title={t("groups.brideParents")}>
        <ControlledInput
          name="basics.wedding.brideMother"
          control={control}
          label={t("mother")}
          placeholder={t("fullNamePlaceholder")}
        />
        <ControlledInput
          name="basics.wedding.brideFather"
          control={control}
          label={t("father")}
          placeholder={t("fullNamePlaceholder")}
        />
      </FieldGroup>
      <FieldGroup title={t("groups.groomParents")}>
        <ControlledInput
          name="basics.wedding.groomMother"
          control={control}
          label={t("mother")}
          placeholder={t("fullNamePlaceholder")}
        />
        <ControlledInput
          name="basics.wedding.groomFather"
          control={control}
          label={t("father")}
          placeholder={t("fullNamePlaceholder")}
        />
      </FieldGroup>
    </div>
  );
}

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-accent-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
        {title}
      </legend>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}
