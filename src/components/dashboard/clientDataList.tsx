import { ArrowRight, MailIcon, PhoneIcon, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { createInitials, phoneNumberSplitting } from "@/lib/utils";
import { Button } from "../ui/button";
import { StatusBadge } from "./statusBadge";
import { ClientWithStatus } from "@/types/dashboard";

// TODO: przywrócić ClientWithStatus[], gdy będzie getClientStatus
export async function ClientDataList({ data }: { data: Omit<ClientWithStatus, "status">[] }) {
  const iconSize = 16;

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-card">
          <TableHead className="w-[30%]">Client</TableHead>
          <TableHead className="w-[35%]">Contact</TableHead>
          <TableHead className="w-[20%]">Event</TableHead>
          <TableHead className="w-[20%]">Status</TableHead>
          <TableHead className="w-[5%]">More</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, name, email, phone }) => {
          return (
            <TableRow key={id} className="group">
              <TableCell className="text-foreground">
                <div className="flex flex-row items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback>{createInitials(name)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  {email ? (
                    <div className="flex items-center gap-2">
                      <MailIcon size={iconSize} className="text-muted-foreground/50" />
                      <span>{email}</span>
                    </div>
                  ) : (
                    <div className="text-muted-foreground/50 flex items-center gap-2">
                      <PlusIcon size={iconSize} />
                      <span>Add email</span>
                    </div>
                  )}
                  {phoneNumberSplitting(phone) ? (
                    <div className="flex items-center gap-2">
                      <PhoneIcon size={iconSize} className="text-muted-foreground/50" />
                      <span>{phoneNumberSplitting(phone)}</span>
                    </div>
                  ) : (
                    <div className="text-muted-foreground/50 flex items-center gap-2">
                      <PlusIcon size={iconSize} />
                      <span>Add phone</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-foreground/80">Wedding</div>
                <div>20.40.2025</div>
              </TableCell>
              <TableCell>{/* <StatusBadge status={status} /> */}</TableCell>
              <TableCell className="pr-0">
                <Button variant="secondary" size="icon">
                  <ArrowRight className="text-muted-foreground group-hover:text-accent-foreground size-5 transition-colors" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
