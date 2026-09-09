import { cn } from "@/lib/utils";

type SectionPolicyProps = {
  title: string;
  content: string;
  boxStyles?: string;
  footer?: string;
};

export function SectionPolicy({ title, content, footer, boxStyles }: SectionPolicyProps) {
  return (
    <div className={cn("border-border/15 flex flex-col gap-2 border-b pb-6", boxStyles)}>
      <p className="text-accent font-serif text-2xl">{title}</p>
      <p className="text-muted-foreground">{content}</p>
      {footer && <p className="text-muted-foreground">{footer}</p>}
    </div>
  );
}
