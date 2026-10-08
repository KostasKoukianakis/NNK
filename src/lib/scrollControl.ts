import type Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

export function refreshLenis() {
  lenisInstance?.resize();
}

/** Scroll to page top — works with Lenis and native scroll. */
export function scrollToTop(options?: { immediate?: boolean }) {
  const immediate = options?.immediate ?? false;

  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate, force: true });
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: immediate ? "auto" : "smooth",
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  requestAnimationFrame(() => ScrollTrigger.refresh());
}
