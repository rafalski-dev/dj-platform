"use server";

import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { getDbErrorKind } from "@/lib/prismaErrors";
import { formatZodErrors } from "@/lib/utils";
import { createContractSchema, CreateContractSchema } from "@/validation/contracts";
import { getTranslations } from "next-intl/server";

export async function createContractAction(formData: CreateContractSchema) {
  await adminCheck();
  const t = await getTranslations("Admin.Contracts.Form");
  const schema = createContractSchema(t);
  const result = schema.safeParse(formData);

  if (!result.success)
    return {
      success: false,
      status: "invalid",
      message: t("serverMessage.invalid"),
      errors: formatZodErrors(result.error),
    };

  const event = await db.event.findFirst({
    where: {
      id: result.data.event,
      clientId: result.data.client.value,
      status: { not: "Cancelled" },
    },
    select: { id: true },
  });

  if (!event) return { success: false, status: "invalid", message: t("serverMessage.invalid") };

  try {
    await db.$transaction(async (tx) => {
      const contract = await tx.contract.create({
        data: { eventId: event.id },
        select: { id: true, number: true, createdAt: true },
      });

      const year = contract.createdAt.getFullYear();
      const number = String(contract.number).padStart(4, "0");

      await tx.contract.update({
        where: { id: contract.id },
        data: { contractNumber: `NC/${year}/${number}` },
      });
    });
  } catch (err) {
    if (getDbErrorKind(err) === "duplicate")
      return { success: false, status: "duplicate", message: t("serverMessage.taken") };

    console.error(err);
    return { success: false, status: "error", message: t("serverMessage.unknown") };
  }

  return { success: true, status: "success", message: t("serverMessage.success") };
}
