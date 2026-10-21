"use server";

import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { getDbErrorKind } from "@/lib/prismaErrors";
import { clientDataFormatter, formatZodErrors } from "@/lib/utils";
import { createClientSchema, CreateClientType } from "@/validation/clients";
import { getTranslations } from "next-intl/server";

export async function createClientAction(formData: CreateClientType) {
  const t = await getTranslations("Admin.Clients.Form");
  const tCreate = await getTranslations("Admin.Clients.Create");
  await adminCheck();

  const schema = createClientSchema(t);
  const validatedValues = schema.safeParse(formData);

  if (!validatedValues.success) {
    return {
      status: "invalid",
      success: false,
      message: t("serverMessage.invalid"),
      errors: formatZodErrors(validatedValues.error),
    };
  }

  try {
    const validatedData = validatedValues.data;

    const client = await db.client.create({ data: clientDataFormatter(validatedData) });

    return {
      status: "success",
      success: true,
      message: tCreate("success", { name: client.name }),
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

export async function deleteClientAction(clientId: string) {
  const t = await getTranslations("Admin.Clients.Details.delete.serverMessage");
  await adminCheck();

  let clientName: string;

  try {
    const client = await db.client.delete({ where: { id: clientId } });
    clientName = client.name;
  } catch (error) {
    console.error(error);
    const kind = getDbErrorKind(error);
    return { status: "error", success: false, message: t(kind === "duplicate" ? "unknown" : kind) };
  }

  return { status: "success", success: true, message: t("success", { name: clientName }) };
}

export async function editClientAction(formData: CreateClientType, clientId: string) {
  await adminCheck();
  const t = await getTranslations("Admin.Clients.Form");
  const tEdit = await getTranslations("Admin.Clients.Edit");

  const schema = createClientSchema(t);
  const validatedValues = schema.safeParse(formData);

  if (!validatedValues.success) {
    return {
      status: "invalid",
      success: false,
      message: t("serverMessage.invalid"),
      errors: formatZodErrors(validatedValues.error),
    };
  }

  try {
    const validatedData = validatedValues.data;

    const client = await db.client.update({
      where: { id: clientId },
      data: clientDataFormatter(validatedData),
    });

    return {
      status: "success",
      success: true,
      message: tEdit("success", { name: client.name }),
    };
  } catch (error) {
    console.error(error);
    const kind = getDbErrorKind(error);
    const messageKey = kind === "duplicate" || kind === "notFound" ? kind : "unknown";
    return {
      status: "error",
      success: false,
      message: t(`serverMessage.${messageKey}`),
    };
  }
}
