"use client";

import dynamic from "next/dynamic";

const ShaderBackground = dynamic(
  () =>
    import("@/components/visual/shader-background").then(
      (module) => module.ShaderBackground,
    ),
  { ssr: false },
);

export function ShaderBackdrop() {
  return <ShaderBackground />;
}
