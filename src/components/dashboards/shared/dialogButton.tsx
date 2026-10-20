"use client";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function DialogButton({ label }: { label: React.ReactNode }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="flex-1 md:w-full"
            onClick={() => console.log("delete acc")}
          >
            {label}
          </Button>
        }
      />
    </AlertDialog>
  );
}
