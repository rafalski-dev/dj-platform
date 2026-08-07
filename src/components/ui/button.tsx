import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex active:translate-y-[1px] shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-base font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 cursor-pointer disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "text-primary-foreground bg-gold-gradient shadow-lg/20 hover:shadow-primary",
        outline: "border-border/20 bg-secondary hover:bg-muted hover:border-border/35 ",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "bg-secondary hover:bg-muted text-primary rounded-sm border transition-colors text-primary border-border/20 hover:border-border/35",
      },
      size: {
        default:
          "h-11 gap-1.5 px-4.5 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 md:text-bas md:h-12",
        xs: "h-8 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-11 gap-1 px-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 text-[14px]",
        lg: "h-14 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-6 md:size-11 md:[&_svg:not([class*='size-'])]:size-7",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "h-11 w-11 text-[14px] [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-10.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
