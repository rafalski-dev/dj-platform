import { ArrowRight, FileTextIcon, UserIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { getFormatter, getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/shadcn/button";
import { ContractItem } from "@/data/contracts";
import { Link } from "@/i18n/navigation";
import { ContractStatusBadge } from "./contractStatusBadge";

type ContractsTableProps = {
  contracts: ContractItem[];
  selectEmptyState: React.ReactNode;
};

export async function ContractsTable({ contracts, selectEmptyState }: ContractsTableProps) {
  const t = await getTranslations("Admin.Contracts");
  const tEventTypes = await getTranslations("Admin.Clients.list.eventTypes");
  const format = await getFormatter();
  const iconSizes = 16;

  return (
    <div className="hidden lg:block">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow className="hover:bg-card">
            <TableHead className="w-[32%] xl:w-[28%]">{t("table.headers.contract")}</TableHead>
            <TableHead className="w-[28%] xl:w-[24%]">{t("table.headers.event")}</TableHead>
            <TableHead className="w-[28%] xl:w-[22%]">{t("table.headers.client")}</TableHead>
            <TableHead className="hidden xl:table-cell">{t("table.headers.status")}</TableHead>
            <TableHead className="text-right">{t("table.headers.more")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.length === 0 ? (
            <TableRow className="hover:bg-card">
              <TableCell colSpan={5} className="whitespace-normal">
                {selectEmptyState}
              </TableCell>
            </TableRow>
          ) : (
            contracts.map(({ id, contractNumber, status, event }) => {
              return (
                <TableRow key={id} className="group">
                  <TableCell className="text-foreground">
                    <div className="flex flex-row items-center gap-3">
                      <div className="border-border bg-accent-foreground/10 text-accent-foreground flex size-9 shrink-0 items-center justify-center rounded-lg border">
                        <FileTextIcon size={iconSizes} />
                      </div>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate text-sm">{contractNumber ?? "—"}</span>
                        <span className="text-popover-foreground truncate text-xs">
                          {event.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-foreground/80 truncate">
                      {event.type === "Other" && event.altType
                        ? event.altType
                        : tEventTypes(event.type)}
                    </div>
                    <div className="truncate">
                      {format.dateTime(event.date, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        weekday: "short",
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserIcon size={iconSizes} className="text-muted-foreground/50 shrink-0" />
                      <span className="truncate">{event.client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <ContractStatusBadge status={status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={{
                        pathname: "/admin/contracts/[contractId]",
                        params: { contractId: id },
                      }}
                      className={buttonVariants({ variant: "secondary", size: "icon" })}
                      aria-label={t("list.details", { number: contractNumber ?? event.name })}
                    >
                      <ArrowRight className="text-muted-foreground group-hover:text-accent-foreground size-5 transition-colors" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
