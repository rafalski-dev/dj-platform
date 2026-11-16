"use client";

import { useMemo } from "react";
import { FieldPath, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/shadcn/button";
import { CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { toast } from "@/components/ui/shadcn/toast";
import { ControlledSearchSelect } from "@/components/shared/form/comboxField";
import { useRouter } from "@/i18n/navigation";
import { createContractAction } from "@/actions/contracts";
import { createContractSchema, CreateContractSchema } from "@/validation/contracts";
import type { ClientWithEvents } from "@/data/contracts";
import { EventRadioField } from "./eventRadioField";

export function ContractCreateForm({ clients }: { clients: ClientWithEvents[] }) {
  const t = useTranslations("Admin.Contracts.Form");
  const { push } = useRouter();
  const schema = useMemo(() => createContractSchema(t), [t]);

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    setError,
    formState: { isSubmitting },
  } = useForm<CreateContractSchema>({ resolver: zodResolver(schema) });

  const selectedClient = useWatch({ control, name: "client" });

  const mappedClients = clients.map(({ id, name }) => ({ label: name, value: id }));

  const clientEvents = clients.find((client) => client.id === selectedClient?.value)?.events;

  function handleClientSelect(client: { label: string; value: string }) {
    const events = clients.find(({ id }) => id === client.value)?.events;

    if (events?.length === 1) {
      setValue("event", events[0].id, { shouldValidate: true });
      return;
    }

    resetField("event");
  }

  async function onSubmit(formData: CreateContractSchema) {
    const response = await createContractAction(formData);

    if (response.success) {
      toast.add({ type: "success", title: t("toast.successTitle"), description: response.message });
      push({ pathname: "/admin/contracts" });
      return;
    }

    toast.add({ type: "error", title: t("toast.errorTitle"), description: response.message });

    if (response.errors) {
      Object.entries(response.errors).forEach(([key, message]) =>
        setError(key as FieldPath<CreateContractSchema>, { message }),
      );
    }
  }

  return (
    <>
      <CardContent>
        <form id="createContract" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <ControlledSearchSelect
              name="client"
              control={control}
              label={t("client.label")}
              placeholder={t("client.placeholder")}
              items={mappedClients}
              onSelect={handleClientSelect}
              required
            />
            <EventRadioField control={control} events={clientEvents} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button form="createContract" type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner />
              {t("submitting")}
            </>
          ) : (
            t("submit")
          )}
        </Button>
      </CardFooter>
    </>
  );
}
