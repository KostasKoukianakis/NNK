"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/scrollControl";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cantor8-style Lenis + GSAP ticker (no scrollerProxy).
 * @see https://www.cantor8.io/ — Lenis({ autoRaf:false, anchors:true, allowNestedScroll:true })
 */
export function SmoothScroll() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;

    gsap.ticker.lagSmoothing(0);

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      allowNestedScroll: true,
    });

    document.documentElement.classList.add("lenis");
    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);

    const resync = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", resync);
    void document.fonts?.ready?.then(resync);

    return () => {
      window.removeEventListener("load", resync);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      setLenisInstance(null);
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return null;
}
