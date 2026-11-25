"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { toast } from "@/components/ui/shadcn/toast";
import { signedContractConfirmAction, signedContractUploadUrlAction } from "@/actions/dashboard";
import { SIGNED_CONTRACT_MAX_SIZE } from "@/constants/dashboard";
import { compressImage } from "@/lib/compressImage";
import { useRouter } from "@/i18n/navigation";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

// PDF goes as it is; a JPG/PNG photo is compressed to a JPG in the browser first.
// Then: 1. ask the server for an upload link, 2. PUT the file to R2, 3. confirm it.
export function ContractUploadButton({
  contractId,
  replace,
}: {
  contractId: string;
  replace?: boolean;
}) {
  const t = useTranslations("Dashboard.Contract.card.upload");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  function showError(description: string) {
    toast.add({ type: "error", title: t("toast.errorTitle"), description });
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    // clear the input, so choosing the same file again still fires onChange
    event.target.value = "";
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) return showError(t("serverMessage.type"));

    setIsUploading(true);

    try {
      const body = file.type === "application/pdf" ? file : await compressImage(file);
      if (body.size > SIGNED_CONTRACT_MAX_SIZE) return showError(t("serverMessage.size"));

      const contentType = body.type === "application/pdf" ? "application/pdf" : "image/jpeg";

      const link = await signedContractUploadUrlAction(contractId, contentType, body.size);
      if (!link.success || !link.url || !link.fileKey)
        return showError(link.message ?? t("serverMessage.unknown"));

      const upload = await fetch(link.url, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body,
      });
      if (!upload.ok) return showError(t("serverMessage.unknown"));

      const response = await signedContractConfirmAction(contractId, link.fileKey);
      if (!response.success) return showError(response.message);

      toast.add({ type: "success", title: t("toast.successTitle"), description: response.message });
      router.refresh();
    } catch (error) {
      console.error(error);
      showError(t("serverMessage.unknown"));
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={handleChange}
      />
      <Button
        variant="outline"
        size="sm"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
      >
        {isUploading ? (
          <>
            <Spinner />
            {t("uploading")}
          </>
        ) : (
          <>
            <UploadIcon />
            {t(replace ? "replace" : "button")}
          </>
        )}
      </Button>
    </>
  );
}
