import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex min-h-11 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-base text-[var(--black)] placeholder:text-black/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
