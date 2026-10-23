import { cn } from "cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-skeleton-base animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

function SubSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-skeleton-second animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton, SubSkeleton };
