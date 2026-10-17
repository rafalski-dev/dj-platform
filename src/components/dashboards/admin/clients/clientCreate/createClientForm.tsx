"use client";

import { FieldPath, FormProvider, useForm, useWatch } from "react-hook-form";
import { ClientType } from "./clientType";
import { PersonalDetails } from "./personalDetails";
import { Contact } from "./contact";
import { BusinessDetails } from "./businessDetails";
import { Address } from "./address";
import { IndividualSummary } from "./individualSummary";
import { Button, buttonVariants } from "@/components/ui/button";
import { BusinessSummary } from "./businessSummary";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientSchema, CreateClientType } from "@/validation/newClient";
import { useMemo } from "react";
import { createClientAction } from "@/actions/admin";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";

const defaultValues = {
  personalDetails: { firstName: "", lastName: "", idCardNumber: "" },
  businessDetails: { businessName: "", taxId: "" },
  contactDetails: { email: "", phone: "" },
  addressDetails: { streetAndNumber: "", postcode: "", city: "", region: "", country: "" },
};

export function CreateClientForm() {
  const t = useTranslations("Admin.Clients.Create");
  const schema = useMemo(() => createClientSchema(t), [t]);
  const formMethods = useForm<CreateClientType>({ defaultValues, resolver: zodResolver(schema) });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = formMethods;
  const clientType = useWatch({ control, name: "clientType" });

  const { push } = useRouter();

  async function onSubmit(formData: CreateClientType) {
    const response = await createClientAction(formData);

    if (response.success) {
      toast.add({
        type: "success",
        title: t("toast.successTitle"),
        description: response.message,
      });
      push("/admin/clients");
      return;
    }

    toast.add({
      type: "error",
      title: t("toast.errorTitle"),
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
    <FormProvider {...formMethods}>
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
              <div className="flex flex-col gap-5 lg:sticky lg:top-23 lg:w-2/5 lg:self-start">
                {clientType === "Individual" ? <IndividualSummary /> : <BusinessSummary />}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      <>{"Submitting"}</>
                    </>
                  ) : (
                    <>{t("actions.submit")}</>
                  )}
                </Button>
                <Link href="/admin/clients" className={buttonVariants({ variant: "outline" })}>
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
