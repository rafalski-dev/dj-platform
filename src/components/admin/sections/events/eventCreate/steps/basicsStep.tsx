import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { ControlledSearchSelect } from "@/components/shared/form/comboxField";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";

import { useCreateEventContext } from "@/hooks/useCreateEventContext";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { FormFieldset } from "../formFieldset";
import { Client } from "../../../../../../../generated";
import { CreateEventSchema } from "@/validation/events";

type BasicsStepProps = {
  clientsList: Pick<Client, "id" | "name">[];
};

export function BasicsStep({ clientsList }: BasicsStepProps) {
  const t = useTranslations("Admin.Events.Form");
  const { setCurrentStep } = useCreateEventContext();
  const { control, trigger } = useFormContext<CreateEventSchema>();
  const type = useWatch({ name: "eventType.type" });

  const mappedClients = clientsList.map(({ id, name }) => {
    return { label: name, value: id };
  });

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <GeneralCardHeader title={t("steps.basics")} />
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <ControlledSearchSelect
              name="basics.client"
              control={control}
              label={t("basics.client.label")}
              placeholder={t("basics.client.placeholder")}
              items={mappedClients}
            />

            <ControlledInput
              name="basics.guestCount"
              control={control}
              type="number"
              label={t("basics.guests.label")}
              placeholder={t("basics.guests.placeholder")}
            />
          </div>
          {type === "Wedding" && <WeddingFields />}
          <ControlledInput
            name="basics.eventTitle"
            control={control}
            label={t("basics.eventTitle.label")}
            placeholder={t("basics.eventTitle.placeholder")}
          />
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep((prev) => prev - 1)}>
          {t("navigation.prev")}
        </Button>
        <Button
          size="sm"
          onClick={async () => {
            const isCorrect = await trigger("basics");
            if (isCorrect) setCurrentStep((prev) => prev + 1);
          }}
        >
          {t("navigation.next")}
        </Button>
      </div>
    </div>
  );
}

export function WeddingFields() {
  const t = useTranslations("Admin.Events.Form.basics.wedding");
  const { control } = useFormContext<CreateEventSchema>();
  return (
    <div className="mt-3 mb-3 flex flex-col gap-6 border-t border-b pt-6 pb-6">
      <FormFieldset title={t("groups.couple")}>
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
      </FormFieldset>
      <FormFieldset title={t("groups.witnesses")}>
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
      </FormFieldset>
      <FormFieldset title={t("groups.brideParents")}>
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
      </FormFieldset>
      <FormFieldset title={t("groups.groomParents")}>
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
      </FormFieldset>
    </div>
  );
}
