import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

type FormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl/none">
          <h2>{title}</h2>
        </CardTitle>
        {description && <CardDescription className="text-sm">{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
