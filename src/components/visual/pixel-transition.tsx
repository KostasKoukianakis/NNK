"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const COLS = 25;
const ROWS = 6;
const REVEAL_RATIO = 0.5;

type PixelTransitionProps = {
  from?: string;
  to?: string;
  accent?: string;
  triggerId: string;
  targetId: string;
  seed?: number;
  className?: string;
};

function seededRandom(seed: number) {
  let t = seed % 2147483647;
  if (t <= 0) t += 2147483646;
  return () => {
    t = (t * 16807) % 2147483647;
    return (t - 1) / 2147483646;
  };
}

function shuffle<T>(arr: T[], rnd: () => number) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const tmp = a[i]!;
    a[i] = a[j]!;
    a[j] = tmp;
  }
  return a;
}

function buildPattern(rnd: () => number) {
  const pattern: (number | null)[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const row: (number | null)[] = [];
    for (let c = 0; c < COLS; c++) {
      let type: number | null = null;
      if (r >= ROWS - 2) {
        type = 1;
      } else {
        const appear = r === 0 ? 0.34 : r === 1 ? 0.5 : 0.7;
        if (rnd() < appear) {
          const p = rnd();
          type = p < 0.55 ? 1 : p < 0.82 ? 2 : 3;
        }
      }
      row.push(type);
    }
    pattern.push(row);
  }
  return pattern;
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function pxCount(progress: number, len: number) {
  if (!len) return 0;
  const p = clamp01(progress);
  if (p >= 0.997) return len;
  return Math.floor(p * len);
}

export function PixelTransition({
  from = "#044AB3",
  to = "#151515",
  accent = "#6FE3FF",
  triggerId,
  targetId,
  seed = 100,
  className,
}: PixelTransitionProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const grid = gridRef.current;
    if (!wrap || !grid) return;

    wrap.style.setProperty("--px-from", from);
    wrap.style.setProperty("--px-solid", to);

    if (reduceMotion) {
      wrap.classList.add("is-solid");
      wrap.style.height = "0px";
      return;
    }

    const triggerEl = document.getElementById(triggerId);
    const targetEl = document.getElementById(targetId);
    if (!triggerEl || !targetEl) return;

    const parent = wrap.parentElement;
    if (parent && getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }

    const pattern = buildPattern(seededRandom(seed));
    grid.innerHTML = "";
    wrap.classList.remove("is-solid");

    const allPixels: HTMLDivElement[] = [];
    const active: HTMLDivElement[] = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const t = pattern[r]![c]!;
        const el = document.createElement("div");
        el.className = "pixel";
        if (t) {
          el.dataset.base = t === 1 ? to : t === 2 ? from : accent;
          active.push(el);
        } else {
          el.dataset.base = from;
        }
        el.style.backgroundColor = from;
        (el as HTMLDivElement & { __c?: string }).__c = from;
        allPixels.push(el);
        grid.appendChild(el);
      }
    }

    const sizeGrid = () => {
      const containerWidth = Math.round(
        wrap.clientWidth || parent?.clientWidth || Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      );
      const draw = Math.max(18, Math.ceil(containerWidth / COLS));
      const gridW = draw * COLS;
      const gridH = draw * ROWS;
      const leftPad = Math.min(0, Math.round((containerWidth - gridW) / 2));
      // Extra blue rows above the dither so pixels don't eat the partners section
      const buffer = draw * 4;

      grid.style.gridTemplateColumns = `repeat(${COLS}, ${draw}px)`;
      grid.style.gridTemplateRows = `repeat(${ROWS}, ${draw}px)`;
      grid.style.width = `${gridW}px`;
      grid.style.height = `${gridH}px`;
      grid.style.marginLeft = `${leftPad}px`;
      grid.style.background = from;
      wrap.style.height = `${gridH}px`;

      if (parent?.classList.contains("transition-cubes")) {
        parent.style.height = `${gridH + buffer}px`;
        parent.style.setProperty("--px-spacer", from);
        parent.style.background = from;
      }
    };

    sizeGrid();

    const revealOrder = shuffle(active, seededRandom(seed + 100));
    const blackOrder = shuffle(active, seededRandom(seed + 200));
    const state = { revealCount: 0, blackCount: 0, solid: false };

    const render = () => {
      if (state.solid) {
        wrap.classList.add("is-solid");
        if (parent?.classList.contains("transition-cubes")) {
          parent.style.setProperty("--px-spacer", to);
          parent.style.background = to;
        }
        return;
      }
      wrap.classList.remove("is-solid");
      if (parent?.classList.contains("transition-cubes")) {
        parent.style.setProperty("--px-spacer", from);
        parent.style.background = from;
      }

      const revealSet = new Set(revealOrder.slice(0, state.revealCount));
      const blackSet = new Set(blackOrder.slice(0, state.blackCount));

      for (const el of allPixels) {
        const pixel = el as HTMLDivElement & { __c?: string };
        let color = from;
        if (revealSet.has(el)) {
          color = blackSet.has(el) ? to : (el.dataset.base ?? from);
        }
        if (pixel.__c !== color) {
          el.style.backgroundColor = color;
          pixel.__c = color;
        }
      }
    };

    const setProgress = (pRaw: number) => {
      const p = clamp01(pRaw);
      const r = clamp01(REVEAL_RATIO);
      const pr = clamp01(r > 0 ? p / r : p);
      state.revealCount = pxCount(pr, revealOrder.length);

      if (p <= r) {
        state.blackCount = 0;
        state.solid = false;
      } else {
        const pb = clamp01((p - r) / (1 - r));
        state.blackCount = pxCount(pb, blackOrder.length);
        state.solid = state.solid ? pb >= 0.985 : pb >= 0.997;
      }
      render();
    };

    const st = ScrollTrigger.create({
      id: `px-${reactId}`,
      trigger: triggerEl,
      endTrigger: targetEl,
      start: "bottom bottom",
      end: "top top",
      invalidateOnRefresh: true,
      onUpdate: (self) => setProgress(self.progress),
      onLeave: () => {
        state.solid = true;
        render();
      },
      onEnterBack: (self) => {
        state.solid = false;
        setProgress(self.progress);
      },
      onLeaveBack: () => {
        state.solid = false;
        setProgress(0);
      },
    });

    setProgress(st.progress);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let lastViewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    const remeasure = () => {
      sizeGrid();
      ScrollTrigger.refresh();
      setProgress(st.progress);
    };

    const onResize = () => {
      const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (Math.abs(w - lastViewportWidth) < 4) return;
      lastViewportWidth = w;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(remeasure, 150);
    };

    window.addEventListener("resize", onResize, { passive: true });
    const refreshTimer = setTimeout(() => {
      remeasure();
    }, 300);

    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      clearTimeout(refreshTimer);
      st.kill();
      grid.innerHTML = "";
    };
  }, [from, to, accent, triggerId, targetId, seed, reactId, reduceMotion]);

  return (
    <div ref={wrapRef} className={`pixel-transition${className ? ` ${className}` : ""}`} aria-hidden="true">
      <div ref={gridRef} className="pixel-grid" />
    </div>
  );
}
