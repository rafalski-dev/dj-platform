import { buttonVariants } from "@/components/ui/shadcn/button";
import { EyeIcon } from "lucide-react";

type CreatePreview = {
  contractId: string;
};

export function CreatePreview({ contractId }: CreatePreview) {
  return (
    <a
      className={buttonVariants({ variant: "outline", size: "sm" })}
      href={`/api/contracts/${contractId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <EyeIcon />
      See preview
    </a>
  );
}
