"use server";

import { adminCheck, getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { formatZodErrors } from "@/lib/utils";
import {
  accountDetailsSchema,
  AccountDetailsType,
  businessDetailsSchema,
  BusinessDetailsType,
} from "@/validation/settings";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function accountDetailsAction(formData: AccountDetailsType) {
  const session = await getSession();
  if (!session)
    return {
      success: false,
      status: "invalidAuth",
      message: "You have no permission to change these details",
    };

  const t = await getTranslations("Admin.Settings");
  const schema = accountDetailsSchema(t);
  const result = schema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      status: "invalid",
      message: "Check your details and try again.",
      errors: formatZodErrors(result.error),
    };
  }

  try {
    await db.user.update({
      data: { name: result.data.fullName },
      where: { id: session.user.id },
    });
    revalidatePath("/[locale]/admin", "layout");

    return { success: true, status: "success", message: "Account details saved" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function businessDetailsAction(formData: BusinessDetailsType) {
  const session = await adminCheck();
  const t = await getTranslations("Admin.Settings");

  const schema = businessDetailsSchema(t);
  const result = schema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      status: "invalid",
      message: "Check your details and try again.",
      errors: formatZodErrors(result.error),
    };
  }

  const data = {
    ...result.data,
    businessName: result.data.businessName || null,
    phone: result.data.phone || null,
    region: result.data.region || null,
    country: result.data.country || null,
  };

  try {
    await db.businessDetails.upsert({
      where: { userId: session.user.id },
      create: { ...data, userId: session.user.id },
      update: data,
    });
    revalidatePath("/[locale]/admin/settings/business-details", "page");

    return { success: true, status: "success", message: "Business details saved" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
