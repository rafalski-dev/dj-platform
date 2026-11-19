import { getSession } from "@/lib/auth-helpers";
import { OverviewEmptyContent } from "./overviewEmptyContent";

// No event and no waiting inquiry: the first step, with the form filled in from the account
export async function OverviewEmpty() {
  const session = await getSession();

  // the account keeps one "name" – the first word is the first name, the rest the last name
  const [firstName = "", ...lastName] = (session?.user.name ?? "").trim().split(/\s+/);

  return (
    <OverviewEmptyContent
      initialContact={{
        firstName,
        lastName: lastName.join(" "),
        email: session?.user.email ?? "",
      }}
    />
  );
}
