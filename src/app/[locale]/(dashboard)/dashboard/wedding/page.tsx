import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { WeddingDetailsForm } from "@/components/client/sections/wedding/weddingDetailsForm";
import { getSelectedEventOption, getWeddingDetailsToEdit } from "@/data/dashboard";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

// The couple, witnesses and parents of the wedding picked in the nav selector
export default async function WeddingEdit() {
  const [t, locale, selected] = await Promise.all([
    getTranslations("Dashboard.WeddingEdit"),
    getLocale(),
    getSelectedEventOption(),
  ]);

  const event = selected?.kind === "event" ? await getWeddingDetailsToEdit(selected.id) : null;
  // not a wedding (or no event selected) – the page doesn't apply
  if (!event) return redirect({ href: "/dashboard", locale });

  const wedding = event.wedding;

  return (
    <>
      <SectionHeader title={t("title")} />
      <WeddingDetailsForm
        eventId={event.id}
        defaultValues={{
          bride: wedding?.bride ?? "",
          groom: wedding?.groom ?? "",
          brideWitness: wedding?.brideWitness ?? "",
          groomWitness: wedding?.groomWitness ?? "",
          brideMother: wedding?.brideMother ?? "",
          brideFather: wedding?.brideFather ?? "",
          groomMother: wedding?.groomMother ?? "",
          groomFather: wedding?.groomFather ?? "",
        }}
      />
    </>
  );
}
