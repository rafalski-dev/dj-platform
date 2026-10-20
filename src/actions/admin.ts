"use server";

import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { getDbErrorKind } from "@/lib/prismaErrors";
import { clientDataFormatter } from "@/lib/utils";
import { createClientSchema, CreateClientType } from "@/validation/newClient";
import { getTranslations } from "next-intl/server";

export async function createClientAction(formData: CreateClientType) {
  const t = await getTranslations("Admin.Clients.Create");
  await adminCheck();

  const schema = createClientSchema(t);
  const validatedValues = schema.safeParse(formData);

  if (!validatedValues.success) {
    return {
      status: "invalid",
      success: false,
      message: t("serverMessage.invalid"),
      errors: Object.fromEntries(
        validatedValues.error.issues
          .map((issue) => [issue.path.join("."), issue.message] as const)
          .reverse(),
      ),
    };
  }

  try {
    const validatedData = validatedValues.data;

    const client = await db.client.create({ data: clientDataFormatter(validatedData) });

    return {
      status: "success",
      success: true,
      message: t("serverMessage.success", { name: client.name }),
    };
  } catch (error) {
    console.error(error);
    const kind = getDbErrorKind(error);
    return {
      status: "error",
      success: false,
      message: kind === "duplicate" ? t("serverMessage.duplicate") : t("serverMessage.unknown"),
    };
  }
}

export async function deleteClient(clientId: string) {
  const t = await getTranslations("Admin.Clients.Details.delete.serverMessage");
  await adminCheck();

  let clientName: string;

  try {
    const client = await db.client.delete({ where: { id: clientId } });
    clientName = client.name;
  } catch (error) {
    const kind = getDbErrorKind(error);
    if (kind === "unknown") console.error(error);
    return { status: "error", success: false, message: t(kind === "duplicate" ? "unknown" : kind) };
  }

  return { status: "success", success: true, message: t("success", { name: clientName }) };
}
