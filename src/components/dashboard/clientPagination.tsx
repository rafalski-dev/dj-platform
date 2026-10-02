"use client";

import { getPathname, Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ClientPagination() {
  const { push } = useRouter();
  const path = usePathname();
  const searchParam = useSearchParams();
  const page = new URLSearchParams(searchParam).get("page");
  console.log(page);

  return (
    <div className="flex flex-row gap-2">
      <Button
        variant={"default"}
        size="icon"
        onClick={() => {
          push(`${path}?page=1`);
        }}
      >
        1
      </Button>
      <Button
        variant={"outline"}
        size="icon"

        onClick={() => {
          push(`${path}?page=2`);
        }}
      >
        2
      </Button>
      <Button
        variant={"outline"}
        size="icon"

        onClick={() => {
          push(`${path}?page=3`);
        }}
      >
        3
      </Button>
    </div>
  );
}
