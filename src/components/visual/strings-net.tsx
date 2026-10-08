"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const BG = "#044AB3";

const CFG = {
  colsDesktop: 18,
  rowsDesktop: 12,
  colsMobile: 12,
  rowsMobile: 9,
  worldW: 1600,
  worldH: 1900,
  camZ: 860,
  fov: 1280,
  tiltXTop: 1.28,
  tiltXBottom: -1.28,
  bowZ: 420,
  waveAmp: 18,
  waveSpeed: 0.65,
  topAnchorY: 0,
  bottomAnchorY: 1,
  lineAlphaNear: 0.42,
  lineAlphaFar: 0.12,
  lineWNear: 1.28,
  lineWFar: 0.52,
  dotRNear: 2.4,
  dotRFar: 1,
  dotAlphaNear: 0.92,
  dotAlphaFar: 0.24,
  cursorSmooth: 0.045,
  cursorRadiusNorm: 0.26,
  cursorZBump: 45,
  cursorWarpY: 22,
  cursorRippleAmp: 10,
  cursorTiltX: 0.1,
  cursorTiltY: 0.16,
};

type Point = { x: number; y: number; z: number };
type Projected = { x: number; y: number; zc: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

/** Perspective net from the Cantor8 partners hero, behind the page content. */
export function StringsNet() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let w = 1;
    let h = 1;
    let cx = 0;
    let cols = CFG.colsDesktop;
    let rows = CFG.rowsDesktop;
    let raf = 0;
    let visible = true;

    const mouse = {
      active: false,
      tx: 0.5,
      ty: 0.5,
      sx: 0.5,
      sy: 0.5,
      yaw: 0,
      pitch: 0,
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      cx = w * 0.5;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      cols = mobile ? CFG.colsMobile : CFG.colsDesktop;
      rows = mobile ? CFG.rowsMobile : CFG.rowsDesktop;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rotateX = (p: Point, a: number): Point => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    };

    const rotateY = (p: Point, a: number): Point => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    };

    const project = (p: Point, anchorY: number): Projected => {
      const zc = p.z + CFG.camZ;
      const k = CFG.fov / Math.max(1, zc);
      return { x: cx + p.x * k, y: anchorY + p.y * k, zc };
    };

    const cursorInfluence = (tx: number, ty: number) => {
      const dx = tx - mouse.sx;
      const dy = ty - mouse.sy;
      const d = Math.hypot(dx, dy);
      if (d >= CFG.cursorRadiusNorm) return { inf: 0, dy, d };
      const f = 1 - d / CFG.cursorRadiusNorm;
      return { inf: f * f, dy, d };
    };

    const gridPoint = (ix: number, iy: number, t: number, topPanel: boolean): Point => {
      const tx = ix / (cols - 1);
      const ty = iy / (rows - 1);
      const x = (tx - 0.5) * CFG.worldW;
      let y = (ty - 0.5) * CFG.worldH;
      const nx = tx - 0.5;
      const ny = ty - 0.5;
      const bowl = (nx * nx + ny * ny) * CFG.bowZ;
      const wave = Math.sin(tx * 4 + ty * 2.6 + t * CFG.waveSpeed) * CFG.waveAmp;
      let z = topPanel ? bowl + wave : bowl - wave;

      const ci = cursorInfluence(tx, ty);
      if (ci.inf > 0) {
        const side = topPanel ? 1 : -1;
        const ripple = Math.sin(ci.d * 30 - t * 4.2) * CFG.cursorRippleAmp * ci.inf;
        z += side * (CFG.cursorZBump * ci.inf + ripple);
        y += (mouse.sy - ty) * CFG.cursorWarpY * ci.inf;
      }

      return { x, y, z };
    };

    const drawSeg = (a: Projected, b: Projected) => {
      const zMid = (a.zc + b.zc) * 0.5;
      const depth = clamp01((CFG.camZ + 620 - zMid) / 1240);
      ctx.strokeStyle = `rgba(255,255,255,${lerp(CFG.lineAlphaFar, CFG.lineAlphaNear, depth).toFixed(3)})`;
      ctx.lineWidth = lerp(CFG.lineWFar, CFG.lineWNear, depth);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    };

    const drawPanel = (t: number, topPanel: boolean) => {
      const pts: Projected[][] = Array.from({ length: rows }, () => Array(cols));
      const anchorY = h * (topPanel ? CFG.topAnchorY : CFG.bottomAnchorY);
      const tiltX = (topPanel ? CFG.tiltXTop : CFG.tiltXBottom) + mouse.pitch * CFG.cursorTiltX;
      const tiltY = mouse.yaw * CFG.cursorTiltY;

      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          let p = gridPoint(ix, iy, t, topPanel);
          p = rotateY(p, tiltY);
          p = rotateX(p, tiltX);
          pts[iy]![ix] = project(p, anchorY);
        }
      }

      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols - 1; ix++) drawSeg(pts[iy]![ix]!, pts[iy]![ix + 1]!);
      }
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows - 1; iy++) drawSeg(pts[iy]![ix]!, pts[iy + 1]![ix]!);
      }

      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const p = pts[iy]![ix]!;
          const depth = clamp01((CFG.camZ + 620 - p.zc) / 1240);
          ctx.fillStyle = `rgba(255,255,255,${lerp(CFG.dotAlphaFar, CFG.dotAlphaNear, depth).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, lerp(CFG.dotRFar, CFG.dotRNear, depth), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const paint = (t: number) => {
      const tx = mouse.active ? mouse.tx : 0.5;
      const ty = mouse.active ? mouse.ty : 0.5;
      mouse.sx += (tx - mouse.sx) * CFG.cursorSmooth;
      mouse.sy += (ty - mouse.sy) * CFG.cursorSmooth;
      mouse.yaw = (mouse.sx - 0.5) * 2;
      mouse.pitch = -(mouse.sy - 0.5) * 2;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);
      drawPanel(t, true);
      drawPanel(t, false);
    };

    const loop = (ts: number) => {
      paint(ts * 0.001);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || !visible || reduceMotion) return;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onResize = () => {
      resize();
      if (reduceMotion) paint(0);
    };

    const setMouse = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = clamp01((clientX - rect.left) / Math.max(1, w));
      mouse.ty = clamp01((clientY - rect.top) / Math.max(1, h));
      mouse.active = true;
    };

    const onMove = (event: PointerEvent) => setMouse(event.clientX, event.clientY);
    const onLeave = () => {
      mouse.active = false;
    };

    resize();
    if (reduceMotion) paint(0);
    else start();

    const observer = new ResizeObserver(onResize);
    observer.observe(wrap);
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    visibility.observe(wrap);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      stop();
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-dvh overflow-hidden bg-[var(--blue)]"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
