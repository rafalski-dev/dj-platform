import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn/card";
import type { ContractDetails } from "@/data/contracts";
import { CalendarIcon, ClockIcon, Trash2Icon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import { ContractStatusBadge } from "../contractsList/contractStatusBadge";
import { DeleteDialog } from "./deleteDialog";
import { EditPopover } from "./editPopover";
import { CreatePreview } from "./createPreview";

export async function ContractHeader({ fetchedData }: { fetchedData: ContractDetails }) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Contracts.Details.header");
  const { id, contractNumber, status, createdAt, updatedAt, event } = fetchedData;

  const contractInfo = [
    { icon: <CalendarIcon size={15} />, label: t("created"), content: createdAt },
    { icon: <ClockIcon size={15} />, label: t("lastEdited"), content: updatedAt },
  ];

  return (
    <Card size="md">
      <div className="flex w-full min-w-0 flex-col gap-5">
        <CardHeader className="flex flex-col gap-2">
          <p className="text-accent-foreground text-xs font-semibold tracking-widest uppercase">
            {t("label")}
          </p>
          <h1 className="font-serif text-[30px]/none wrap-break-word lining-nums lg:text-[34px]/none">
            {contractNumber ?? "—"}
          </h1>
          <p className="text-muted-foreground text-sm">{event.name}</p>
          <div className="flex flex-row flex-wrap items-center gap-2">
            <ContractStatusBadge status={status} />
          </div>
        </CardHeader>
        <CardContent>
          <dl className="flex flex-row flex-wrap justify-start gap-x-4 gap-y-2">
            {contractInfo.map(({ icon, label, content }, index) => {
              return (
                <div
                  key={index}
                  className="text-muted-foreground flex flex-row flex-wrap gap-2 text-[13px]"
                >
                  <dt className="text-popover-foreground flex flex-row items-center gap-2">
                    {icon}
                    {label}
                  </dt>
                  <dd>
                    {format.dateTime(content, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              );
            })}
          </dl>
        </CardContent>
      </div>
      <CardFooter className="mx-(--card-spacing) flex-col items-stretch gap-3 border-t px-0 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <CreatePreview contractId={id} />
          <EditPopover clientId={event.clientId} eventId={event.id} />
        </div>
        <DeleteDialog
          contractId={id}
          label={
            <>
              <Trash2Icon />
              {t("delete")}
            </>
          }
        />
      </CardFooter>
    </Card>
  );
}
