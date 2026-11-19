// What the contract still needs. One place for the client panel (the alert) and later for the
// admin and the "generate contract" check. Only fields the contract template really uses –
// the package/price come in later together with pricing.
type ContractFieldsSource = {
  startsAt: Date | null;
  endsAt: Date | null;
  address: string | null;
  client: { streetAndNumber: string | null; postcode: string | null; city: string | null };
};

// Every field the contract needs, in the order the client sees them in the checklist
export const CONTRACT_FIELDS = ["hours", "venueAddress", "homeAddress"] as const;

export type MissingField = (typeof CONTRACT_FIELDS)[number];

export function getMissingFields(event: ContractFieldsSource): MissingField[] {
  const missing: MissingField[] = [];
  const { client } = event;

  if (!event.startsAt || !event.endsAt) missing.push("hours");
  if (!event.address?.trim()) missing.push("venueAddress");
  if (!client.streetAndNumber?.trim() || !client.postcode?.trim() || !client.city?.trim())
    missing.push("homeAddress");

  return missing;
}
