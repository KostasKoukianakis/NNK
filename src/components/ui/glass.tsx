import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const PAGE_WIDTH = "mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-12 xl:px-16";

/** Full-bleed edge padding (no max-width) — Cantor8 hero / home chrome (1.75rem sides) */
export const FULL_BLEED = "w-full px-7 sm:px-7 lg:px-7";

interface PanelProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/** @deprecated Prefer SurfacePanel — kept for existing imports */
export function GlassPanel({
  children,
  className,
  as: Tag = "div",
}: PanelProps) {
  return <Tag className={cn("surface-card rounded-2xl", className)}>{children}</Tag>;
}

export function SurfacePanel({
  children,
  className,
  as: Tag = "div",
}: PanelProps) {
  return <Tag className={cn("surface-card rounded-2xl", className)}>{children}</Tag>;
}

export function PageShell({
  children,
  wide = false,
  className,
}: {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(PAGE_WIDTH, "py-10 sm:py-14", wide && "w-full")}>
      <div className={cn("rounded-2xl border border-white/15 bg-white/[0.06] p-6 sm:p-10 lg:p-12", className)}>
        {children}
      </div>
    </div>
  );
}

export function WireBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("wire-grid", className)}>
      <svg viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <rect x="40" y="60" width="280" height="180" rx="28" stroke="white" strokeWidth="1.2" />
        <rect x="360" y="40" width="420" height="260" rx="36" stroke="white" strokeWidth="1.2" />
        <rect x="820" y="90" width="520" height="200" rx="32" stroke="white" strokeWidth="1.2" />
        <rect x="80" y="300" width="360" height="240" rx="32" stroke="white" strokeWidth="1.2" />
        <rect x="500" y="360" width="300" height="180" rx="28" stroke="white" strokeWidth="1.2" />
        <rect x="860" y="340" width="480" height="280" rx="40" stroke="white" strokeWidth="1.2" />
        <rect x="120" y="600" width="520" height="220" rx="36" stroke="white" strokeWidth="1.2" />
        <rect x="700" y="680" width="360" height="160" rx="28" stroke="white" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
