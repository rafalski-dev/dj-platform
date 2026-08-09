import { FacebookIcon } from "@/components/icons/facebookIcon";
import { InstagramIcon } from "@/components/icons/instagramIcon";
import { YoutubeIcon } from "@/components/icons/youtubeIcon";
import { FooterSocialSectionProps } from "@/types/footer";

const mapIcon = {
  instagram: <InstagramIcon className="w-4.5" />,
  facebook: <FacebookIcon className="w-4.5" />,
  youtube: <YoutubeIcon className="w-4.5" />,
};

export function FooterSocialSection({ title, linksList }: FooterSocialSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-primary text-[20px] lg:text-[22px]">{title}</h3>
      <ul className="flex flex-col gap-3">
        {linksList.map(({ name, url, icon }) => (
          <li key={name}>
            <a
              className="text-popover-foreground hover:text-accent-foreground flex items-center gap-2 text-[14.5px] font-normal transition-colors lg:text-base"
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {mapIcon[icon]}
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
