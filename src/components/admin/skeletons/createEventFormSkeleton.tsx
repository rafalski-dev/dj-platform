import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import { Skeleton, SubSkeleton } from "@/components/ui/shadcn/skeleton";

// Mirrors the first step of the create event form: stepper, event type cards and navigation
const STEPS = 5;
const EVENT_TYPE_OPTIONS = 8;

function FormStepsSkeleton() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-3">
        <SubSkeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-36" />
      </CardHeader>
      <CardContent>
        <ol className="flex justify-between">
          {Array.from({ length: STEPS }).map((_, index) => (
            <li key={index} className="group flex flex-1 items-center last:flex-none">
              <Skeleton className="size-8 shrink-0 rounded-sm" />
              <div
                aria-hidden="true"
                className="bg-border mx-1 h-px w-full group-last:hidden md:mx-3"
              />
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function EventTypeStepSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-7 w-40" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: EVENT_TYPE_OPTIONS }).map((_, index) => (
            <div key={index} className="bg-background/60 rounded-2xl border p-2">
              <div className="flex flex-col gap-4 p-3">
                <div className="flex items-start justify-between gap-3">
                  <Skeleton className="size-11 rounded-lg" />
                  <SubSkeleton className="size-4 rounded-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-6 w-28" />
                  <SubSkeleton className="h-4 w-full" />
                  <SubSkeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function CreateEventFormSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <FormStepsSkeleton />
      <EventTypeStepSkeleton />
      <div className="flex justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
}
