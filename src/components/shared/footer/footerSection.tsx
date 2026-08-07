import { NavItem } from "@/types/navigation";
import Link from "next/link";

type FooterSectionProps = {
  title: string;
  linksList: NavItem[];
};

export function FooterSection({ title, linksList }: FooterSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-primary text-[20px]">{title}</h3>
      <ul className="flex flex-col gap-2">
        {linksList.map(({ label, path }, index) => (
          <li key={index}>
            {path.startsWith("#") ? (
              <a
                href={path}
                className="text-popover-foreground hover:text-accent-foreground font-normal transition-colors"
              >
                {label}
              </a>
            ) : (
              <Link
                href={path}
                className="text-popover-foreground hover:text-accent-foreground font-normal transition-colors"
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
