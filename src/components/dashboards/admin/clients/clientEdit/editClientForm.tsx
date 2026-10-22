"use client";

import { FieldPath, FormProvider, useForm, useWatch } from "react-hook-form";
import { ClientType } from "../clientCreate/clientType";
import { PersonalDetails } from "../clientCreate/personalDetails";
import { BusinessDetails } from "../clientCreate/businessDetails";
import { Contact } from "../clientCreate/contact";
import { Address } from "../clientCreate/address";
import { IndividualSummary } from "../clientCreate/individualSummary";
import { BusinessSummary } from "../clientCreate/businessSummary";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { createClientSchema, CreateClientType } from "@/validation/clients";
import { useTranslations } from "next-intl";
import { editClientAction } from "@/actions/clients";
import { toast } from "@/components/ui/toast";
import { getClientToEdit } from "@/data/clients";

type EditClientFormProps = {
  fetchedData: NonNullable<Awaited<ReturnType<typeof getClientToEdit>>>;
  clientId: string;
};

export function EditClientForm({ fetchedData, clientId }: EditClientFormProps) {
  const t = useTranslations("Admin.Clients.Form");
  const tEdit = useTranslations("Admin.Clients.Edit");
  const { push } = useRouter();
  const schema = useMemo(() => createClientSchema(t), [t]);

  const defaultValues = {
    clientType: fetchedData.clientType,
    personalDetails: {
      firstName: fetchedData.firstName,
      lastName: fetchedData.lastName,
      gender: fetchedData.gender ?? undefined,
      idCardNumber: fetchedData.idCardNumber ?? "",
    },
    businessDetails: {
      businessName: fetchedData.businessName ?? "",
      taxId: fetchedData.taxId ?? "",
    },
    contactDetails: {
      email: fetchedData.email ?? "",
      phone: fetchedData.phone ?? "",
    },
    addressDetails: {
      streetAndNumber: fetchedData.streetAndNumber ?? "",
      postcode: fetchedData.postcode ?? "",
      city: fetchedData.city ?? "",
      region: fetchedData.region ?? "",
      country: fetchedData.country ?? "",
    },
  };

  const methods = useForm<CreateClientType>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = methods;

  const clientType = useWatch({ control, name: "clientType" });

  async function onSubmit(formData: CreateClientType) {
    const response = await editClientAction(formData, clientId);

    if (response.success) {
      toast.add({
        type: "success",
        title: tEdit("toast.successTitle"),
        description: response.message,
      });
      push({ pathname: "/admin/clients/[clientId]", params: { clientId: clientId } });
      return;
    }

    toast.add({
      type: "error",
      title: tEdit("toast.errorTitle"),
      description: response.message,
      timeout: 8000,
    });

    if (response.errors) {
      Object.entries(response.errors).forEach(([field, message]) => {
        setError(field as FieldPath<CreateClientType>, { message });
      });
    }
  }

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <ClientType />
          {clientType && (
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-5 lg:w-3/5">
                {clientType === "Individual" ? <PersonalDetails /> : <BusinessDetails />}
                <Contact />
                <Address />
              </div>
              <div className="flex flex-col gap-5 lg:w-2/5">
                {clientType === "Individual" ? <IndividualSummary /> : <BusinessSummary />}
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? (
                    <>
                      <Spinner /> {t("actions.submitting")}
                    </>
                  ) : (
                    <>{tEdit("submit")}</>
                  )}
                </Button>
                <Link
                  href={{ pathname: "/admin/clients/[clientId]", params: { clientId: clientId } }}
                  className={buttonVariants({ variant: "outline" })}
                >
                  {t("actions.cancel")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
