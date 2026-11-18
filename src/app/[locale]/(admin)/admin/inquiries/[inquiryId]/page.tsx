import {
  InquiryContact,
  InquiryEventCard,
} from "@/components/admin/sections/inquiries/inquiryDetails/inquiryContact";
import { InquiryHeader } from "@/components/admin/sections/inquiries/inquiryDetails/inquiryHeader";
import { InquiryInfo } from "@/components/admin/sections/inquiries/inquiryDetails/inquiryInfo";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { FormError } from "@/components/shared/form/formError";
import { getInquiryDetails } from "@/data/inquiries";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Inquiry({
  params,
}: {
  params: Promise<{ locale: string; inquiryId: string }>;
}) {
  const { inquiryId } = await params;
  const t = await getTranslations("Admin.Inquiries.Details");

  const inquiry = await getInquiryDetails(inquiryId);
  if (!inquiry) notFound();

  return (
    <>
      <Breadcrumbs dynamicLabel={`${inquiry.firstName} ${inquiry.lastName}`} />
      <InquiryHeader fetchedData={inquiry} />
      {inquiry.isDateTaken && <FormError error={t("dateTaken")} className="mt-0" />}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
        <div className="flex min-w-0 flex-col gap-5">
          <InquiryInfo fetchedData={inquiry} />
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          {inquiry.event && <InquiryEventCard event={inquiry.event} />}
          <InquiryContact fetchedData={inquiry} />
        </div>
      </div>
    </>
  );
}
