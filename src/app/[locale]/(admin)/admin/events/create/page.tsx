import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";

export default function CreateEvent() {
  return (
    <>
      <Breadcrumbs />
      <SectionHeader
        title="Create event"
        description="Provide information about event in multi step form below."
      />
    </>
  );
}
