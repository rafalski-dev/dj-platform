import { FooterSectionProps } from "@/types/footer";
import { FooterLink } from "./footerLink";

export function FooterSection({ title, linksList }: FooterSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-primary text-[20px]">{title}</h3>
      <ul className="flex flex-col gap-2">
        {linksList.map(({ navKey, path }, index) => (
          <li key={index}>
            <FooterLink navKey={navKey} path={path} />
          </li>
        ))}
      </ul>
    </div>
  );
}
