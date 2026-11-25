import type { useTranslations } from "next-intl";
import z from "zod";

type ContractFormTranslator = ReturnType<typeof useTranslations<"Admin.Contracts.Form">>;

export function createContractSchema(t: ContractFormTranslator) {
  return z.object({
    client: z.object({ label: z.string(), value: z.string() }, t("client.required")),
    event: z.string(t("event.required")).min(1, t("event.required")),
    // whole PLN as typed in the input – the action turns it into a number
    price: z
      .string(t("price.required"))
      .min(1, t("price.required"))
      .regex(/^[1-9]\d{0,6}$/, t("price.invalid")),
  });
}

export type CreateContractSchema = z.infer<ReturnType<typeof createContractSchema>>;
