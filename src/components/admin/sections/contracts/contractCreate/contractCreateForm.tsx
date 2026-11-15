"use client";

import { Button } from "@/components/ui/shadcn/button";
import { CardContent, CardFooter } from "@/components/ui/shadcn/card";

export function ContractCreateForm() {
  return (
    <>
      <CardContent>
        <form noValidate></form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button form="createContract" type="submit" size="sm">
          Create
        </Button>
      </CardFooter>
    </>
  );
}
