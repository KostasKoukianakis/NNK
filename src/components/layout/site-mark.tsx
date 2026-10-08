import { HOSPITAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteMark({ className, light = true }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("flex items-center gap-[0.55em]", className)}>
      <svg aria-hidden="true" viewBox="0 0 40 40" className="site-mark-logo shrink-0">
        <rect
          width="40"
          height="40"
          rx="8"
          className={light ? "fill-white" : "fill-[var(--blue)]"}
        />
        <path
          d="M20 8v24M10 16.5h20"
          className={light ? "stroke-[var(--blue)]" : "stroke-white"}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex min-w-0 flex-col">
        <span className={cn("site-mark-word", light ? "text-white" : "text-[var(--black)]")}>
          {HOSPITAL.shortName}
        </span>
        <span className={cn("site-mark-sub truncate", light ? "text-white/65" : "text-black/55")}>
          {HOSPITAL.name}
        </span>
      </span>
    </span>
  );
}
