import { Link } from "@/i18n/navigation";
import { Pathname } from "@/types/navigation";

export function InputLink({ pathname }: { pathname: Pathname }) {
  return (
    <Link href={{ pathname: pathname }} className="text-accent-foreground text-xs tracking-wide">
      Forgot password?
    </Link>
  );
}
