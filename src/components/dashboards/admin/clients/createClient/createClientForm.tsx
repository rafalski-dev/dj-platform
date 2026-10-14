"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import { ClientType } from "./clientType";
import { PersonalDetails } from "./personalDetails";
import { Contact } from "./contact";
import { BusinessDetails } from "./businessDetails";
import { Address } from "./address";
import { IndividualSummary } from "./individualSummary";
import { Button, buttonVariants } from "@/components/ui/button";
import { BusinessSummary } from "./businessSummary";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const defaultValues = {
  clientType: "",
  personalDetails: { firstName: "", lastName: "", gender: "", idCardNumber: "" },
  businessDetails: { businessName: "", taxId: "" },
  contactDetails: { email: "", phone: "" },
  addressDetails: { streetAndNumber: "", postcode: "", city: "", state: "", country: "" },
};

export function CreateClientForm() {
  const t = useTranslations("Admin.Clients.Create.actions");
  const formMethods = useForm({ defaultValues });
  const { handleSubmit, control } = formMethods;
  const clientType = useWatch({ control, name: "clientType" });

  function onSubmit(data: unknown) {
    console.log(data);
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
                <Button type="submit">{t("submit")}</Button>
                <Link href="/admin/clients" className={buttonVariants({ variant: "outline" })}>
                  {t("cancel")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
