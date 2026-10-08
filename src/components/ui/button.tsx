import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-0 whitespace-nowrap text-base font-medium transition-[transform,background-color,color] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--blue)] text-white hover:bg-[var(--primary-deep)]",
        accent: "bg-white text-[var(--blue)] hover:bg-white/92",
        emergency: "bg-[var(--emergency)] text-white hover:brightness-110",
        outline: "border border-white/35 bg-transparent text-white hover:bg-white/10",
        ghost: "bg-transparent text-white hover:bg-white/10",
        link: "text-white underline-offset-4 hover:underline",
        dark: "bg-[var(--black)] text-white hover:bg-black",
      },
      size: {
        default: "min-h-11 rounded-[3px]",
        sm: "min-h-9 rounded-[3px] text-sm",
        lg: "min-h-[3rem] rounded-[3px] text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function ArrowBox({
  variant,
  size,
}: {
  variant?: string | null;
  size?: string | null;
}) {
  const onBlue = variant === "accent" || variant === "outline" || variant === "ghost";
  const emergency = variant === "emergency";
  // Cantor8: nav CTA ~44px tall with ~36px arrow square (~4px inset).
  const box = size === "sm" ? "size-9" : size === "lg" ? "size-10" : "size-9";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[2px]",
        box,
        onBlue
          ? variant === "outline" || variant === "ghost"
            ? "border border-white/30"
            : "bg-[var(--blue)] text-white"
          : emergency
            ? "bg-black/15"
            : "bg-black/15 text-white",
      )}
    >
      <ArrowUpRight className={size === "sm" ? "size-3.5" : "size-4"} strokeWidth={2.25} />
    </span>
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  arrow?: boolean;
}

export function Button({
  className,
  variant,
  size,
  arrow = false,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  if (asChild) {
    return (
      <Comp className={cn(buttonVariants({ variant, size }), "px-5", className)} {...props}>
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), arrow ? "pl-5" : "px-5", className)}
      {...props}
    >
      {arrow ? <span className="pr-4">{children}</span> : children}
      {arrow ? <ArrowBox variant={variant} size={size} /> : null}
    </Comp>
  );
}

export function CtaLink({
  href,
  children,
  className,
  variant = "accent",
  size = "default",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
}) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant, size }),
        "gap-4 py-1.5 pl-5 pr-1.5 font-medium tracking-[-0.01em]",
        className,
      )}
    >
      <span className="pr-1">{children}</span>
      <ArrowBox variant={variant} size={size} />
    </Link>
  );
}

export { buttonVariants };
