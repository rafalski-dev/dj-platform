import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton, SubSkeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Mirrors the form of an individual client: personal details, contact, address and preview
const CLIENT_TYPE_OPTIONS = 2;
const CLIENT_TYPE_TAGS = 3;
const PREVIEW_ROWS = 9;

function FormSectionSkeleton({
  description,
  children,
}: {
  description?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-44" />
        {description && <SubSkeleton className="h-5 w-full max-w-80" />}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function FieldSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2">
      <SubSkeleton className="h-5 w-24" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}

function FieldsRowSkeleton({ className = "md:flex-row" }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <FieldSkeleton />
      <FieldSkeleton />
    </div>
  );
}

export function ClientFormSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <FormSectionSkeleton description>
        <div className="grid w-full gap-3 sm:grid-cols-2">
          {Array.from({ length: CLIENT_TYPE_OPTIONS }).map((_, index) => (
            <div key={index} className="bg-background/60 rounded-2xl border p-2">
              <div className="flex flex-col gap-4 p-3">
                <div className="flex items-start justify-between gap-3">
                  <Skeleton className="size-11 rounded-lg" />
                  <SubSkeleton className="size-4 rounded-full" />
                </div>
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-6 w-28" />
                  <SubSkeleton className="h-4 w-full max-w-60" />
                </div>
                <div className="flex flex-row flex-wrap gap-1.5">
                  {Array.from({ length: CLIENT_TYPE_TAGS }).map((_, index) => (
                    <SubSkeleton key={index} className="h-6.5 w-20 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </FormSectionSkeleton>
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-5 lg:w-3/5">
          <FormSectionSkeleton>
            <FieldsRowSkeleton />
            <FieldsRowSkeleton />
          </FormSectionSkeleton>
          <FormSectionSkeleton>
            <FieldsRowSkeleton className="md:flex-row lg:flex-col" />
          </FormSectionSkeleton>
          <FormSectionSkeleton>
            <FieldSkeleton />
            <FieldsRowSkeleton />
            <FieldsRowSkeleton />
          </FormSectionSkeleton>
        </div>
        <div className="flex flex-col gap-5 lg:sticky lg:top-23 lg:w-2/5 lg:self-start">
          <FormSectionSkeleton>
            <div>
              <div className="flex flex-row gap-4 pb-4">
                <Skeleton className="size-12 shrink-0 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-5 w-36" />
                  <SubSkeleton className="h-5.5 w-20" />
                </div>
              </div>
              <div className="border-t" />
              <div className="flex flex-col gap-1 pt-4">
                {Array.from({ length: PREVIEW_ROWS }).map((_, index) => (
                  <div key={index} className="flex flex-row items-center justify-between gap-3">
                    <SubSkeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                ))}
              </div>
            </div>
          </FormSectionSkeleton>
          <Skeleton className="h-11 w-full md:h-12" />
          <Skeleton className="h-11 w-full md:h-12" />
        </div>
      </div>
    </div>
  );
}
