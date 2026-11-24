// What the contract still needs. One place for the client panel (the alert) and later for the
// admin and the "generate contract" check. Only fields the contract template really uses –
// the package/price come in later together with pricing.
type ContractFieldsSource = {
  startsAt: Date | null;
  endsAt: Date | null;
  address: string | null;
  client: { streetAndNumber: string | null; postcode: string | null; city: string | null };
};

export type MissingField = "hours" | "venueAddress" | "homeAddress";

// The overview shows one task card per group – each group is filled in on its own page
export const EVENT_FIELDS: MissingField[] = ["hours", "venueAddress"];
export const ADDRESS_FIELDS: MissingField[] = ["homeAddress"];

export function getMissingFields(event: ContractFieldsSource): MissingField[] {
  const missing: MissingField[] = [];
  const { client } = event;

  if (!event.startsAt || !event.endsAt) missing.push("hours");
  if (!event.address?.trim()) missing.push("venueAddress");
  if (!client.streetAndNumber?.trim() || !client.postcode?.trim() || !client.city?.trim())
    missing.push("homeAddress");

  return missing;
}
