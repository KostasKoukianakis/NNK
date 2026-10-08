"use client";

import { useEffect, useRef } from "react";

const OX = 383;
const OY = 524;
const BG = "#044ab3";

const DEFS: { o: number; d: string }[] = [
  { o: 1, d: "M155,568 C150,650 205,770 295,865 C350,925 425,950 475,915 C545,860 602,745 604,625 C606,585 592,565 575,563" },
  { o: 1, d: "M155,568 C165,530 205,495 250,472 C275,448 305,445 322,452" },
  { o: 1, d: "M265,440 C270,400 255,360 235,335 L178,345 C125,400 125,500 150,545 L155,568" },
  { o: 1, d: "M178,345 C185,300 225,265 270,235 C285,260 275,300 270,335" },
  { o: 1, d: "M490,470 C500,440 540,420 560,435 C600,470 610,540 575,563" },
  { o: 0, d: "M490,470 C480,500 500,545 535,555 C555,560 570,562 578,562" },
  { o: 0, d: "M265,440 C262,455 255,462 250,472" },
  { o: 1, d: "M118,168 L135,150 L148,148 L150,160 L165,155 L168,165 C210,175 240,200 262,238" },
  { o: 0, d: "M122,188 C160,195 195,200 215,235 C230,250 245,262 262,268" },
  { o: 1, d: "M200,110 L232,98 L295,228 L300,280" },
  { o: 0, d: "M200,110 L262,225 L275,255" },
  { o: 1, d: "M340,105 L368,100 L342,230 C340,255 345,280 340,300" },
  { o: 0, d: "M340,105 L310,225 L302,275" },
  { o: 1, d: "M345,235 C350,225 365,215 385,238 C420,235 470,255 495,290" },
  { o: 0, d: "M385,238 C370,270 378,300 360,320" },
  { o: 1, d: "M495,290 L545,262 L560,245 L575,262 L590,262 L598,270 L610,300 L630,305 L640,320 L645,340 L625,350 L610,365 L600,360 L585,370 C575,395 590,430 590,470 C590,520 585,545 575,563" },
  { o: 0, d: "M495,290 C470,310 455,330 452,360 C445,400 448,430 455,455" },
  { o: 0, d: "M410,300 C370,300 340,320 335,350 C335,375 360,390 355,410 C350,430 325,445 322,455" },
  { o: 0, d: "M455,455 C470,500 485,545 480,590 C470,620 440,635 400,660 C375,720 355,760 365,860" },
  { o: 0, d: "M480,590 C500,640 520,720 530,715" },
  { o: 0, d: "M295,682 L350,675 C380,660 400,645 430,630" },
  { o: 0, d: "M340,610 C360,615 375,630 385,640" },
  { o: 0, d: "M220,590 C222,560 235,530 248,512 C262,525 270,540 272,550" },
  { o: 0, d: "M360,555 C362,520 352,490 345,478 C380,490 420,510 445,520" },
  { o: 0, d: "M385,498 C400,470 415,440 430,425" },
  { o: 0, d: "M360,462 L410,440" },
];

const TOKENS = [
  "ΕΠΕΙΓΟΝΤΑ…",
  "ΚΛΙΝΙΚΕΣ…",
  "ΥΠΕΡΒΑΡΙΚΗ…",
  "ΡΑΝΤΕΒΟΥ…",
  "ΔΙΚΑΙΟΥΧΟΙ…",
  "ΠΕΡΙΘΑΛΨΗ…",
  "ΕΞΩΤΕΡΙΚΑ…",
  "ΟΔΗΓΙΕΣ…",
  "ΝΟΣΗΛΕΙΑ…",
  "ΕΠΙΣΚΕΠΤΗΡΙΟ…",
  "ΤΗΛΕΦΩΝΑ…",
  "ΑΠΟΤΕΛΕΣΜΑΤΑ…",
  "ΧΕΙΡΟΥΡΓΙΚΗ…",
  "ΠΑΘΟΛΟΓΙΚΗ…",
  "ΕΡΓΑΣΤΗΡΙΑ…",
  "ΚΑΤΑΔΥΤΙΚΗ…",
];

const CFG = {
  windAmpPx: 22,
  windCyclesMin: 2,
  windCyclesMax: 4,
  stiffness: 12,
  damping: 4.8,
  maxBendPx: 70,
  midBoost: 1.7,
  mouseRadius: 140,
  impulseForce: 3200,
  impulseFalloff: 1.7,
  flowPeriod: 4.8,
  flowWidth: 0.22,
  flowBaseAlpha: 0.1,
  flowPeakAlpha: 0.7,
  labelInDur: 0.45,
  labelOutDur: 0.55,
  labelShowHoldMin: 1.0,
  labelShowHoldMax: 2.0,
  labelInStaggerMin: 0.14,
  labelInStaggerMax: 0.42,
  labelOutStaggerMin: 0.12,
  labelOutStaggerMax: 0.38,
  labelBatchGap: 0.25,
  labelBatchDesktop: 5,
  labelBatchMobile: 3,
  labelPad: 14,
  labelClamp: 12,
  labelMinGapPx: 48,
};

type Particle = {
  px: number;
  py: number;
  outer: boolean;
  sx: number;
  sy: number;
  phase: number;
  drift: number;
};

type Filament = {
  i: number;
  j: number;
  bend: number;
  vel: number;
  phase: number;
  windCycles: number;
  ampJ: number;
  /** Mean radial distance from heart centre (0 near center → 1 near edge). */
  radial: number;
};

type Label = {
  nodeIndex: number;
  text: string;
  side: number;
  inStart: number;
  inEnd: number;
  outStart: number;
  outEnd: number;
};

function hash(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453123;
  return x - Math.floor(x);
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function cycDist(a: number, b: number) {
  const d = Math.abs(a - b);
  return Math.min(d, 1 - d);
}

function pulseAlpha(u: number, phase: number, width: number, base: number, peak: number) {
  const d = cycDist(u, phase);
  const x = Math.max(0, 1 - d / width);
  const s = x * x * (3 - 2 * x);
  return base + (peak - base) * s;
}

function pointLineDistanceWithT(px: number, py: number, x1: number, y1: number, x2: number, y2: number) {
  const vx = x2 - x1;
  const vy = y2 - y1;
  const wx = px - x1;
  const wy = py - y1;
  const c2 = vx * vx + vy * vy || 1;
  let t = (wx * vx + wy * vy) / c2;
  if (t < 0) t = 0;
  if (t > 1) t = 1;
  const sx = x1 + t * vx;
  const sy = y1 + t * vy;
  return { d: Math.hypot(px - sx, py - sy), t };
}

/** Same density as before the center-radial rewrite. */
function buildCloud(): { particles: Particle[]; filaments: Filament[]; outerIdx: number[]; maxR: number } {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  const skeleton: { px: number; py: number; outer: boolean }[] = [];

  for (const def of DEFS) {
    const el = document.createElementNS(ns, "path");
    el.setAttribute("d", def.d);
    svg.appendChild(el);
    const len = el.getTotalLength();
    const step = def.o ? 10 : 16;
    for (let l = 0; l < len; l += step) {
      const q = el.getPointAtLength(l);
      skeleton.push({ px: q.x, py: q.y, outer: def.o === 1 });
    }
  }
  svg.remove();

  const seen = new Set<string>();
  const particles: Particle[] = [];
  const pushUnique = (px: number, py: number, outer: boolean) => {
    const key = `${Math.round(px)}:${Math.round(py)}`;
    if (seen.has(key)) return;
    seen.add(key);
    particles.push({
      px,
      py,
      outer,
      sx: 0,
      sy: 0,
      phase: Math.random() * Math.PI * 2,
      drift: 0.25 + Math.random() * 0.55,
    });
  };

  for (const p of skeleton) pushUnique(p.px, p.py, p.outer);

  for (let i = 0; i < skeleton.length; i++) {
    if (Math.random() > 0.5) continue;
    const p = skeleton[i];
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * (p.outer ? 12 : 20);
    pushUnique(p.px + Math.cos(a) * r, p.py + Math.sin(a) * r, false);
  }

  for (let i = 0; i < 360; i++) {
    const a = skeleton[Math.floor(Math.random() * skeleton.length)];
    let b = a;
    for (let tries = 0; tries < 8; tries++) {
      const cand = skeleton[Math.floor(Math.random() * skeleton.length)];
      const dx = cand.px - a.px;
      const dy = cand.py - a.py;
      const d2 = dx * dx + dy * dy;
      if (d2 > 900 && d2 < 22000) {
        b = cand;
        break;
      }
    }
    const t = Math.random();
    pushUnique(
      a.px + (b.px - a.px) * t + (Math.random() - 0.5) * 12,
      a.py + (b.py - a.py) * t + (Math.random() - 0.5) * 12,
      false,
    );
  }

  let maxR = 1;
  for (const p of particles) {
    maxR = Math.max(maxR, Math.hypot(p.px - OX, p.py - OY));
  }

  const filaments: Filament[] = [];
  const linked = new Set<string>();
  const n = particles.length;
  const cell = 70;
  const grid = new Map<string, number[]>();
  const windSpan = CFG.windCyclesMax - CFG.windCyclesMin + 1;

  for (let i = 0; i < n; i++) {
    const gx = Math.floor(particles[i].px / cell);
    const gy = Math.floor(particles[i].py / cell);
    const key = `${gx}:${gy}`;
    const bucket = grid.get(key);
    if (bucket) bucket.push(i);
    else grid.set(key, [i]);
  }

  // Longer reach so strings are visible (not only ultra-close neighbors).
  const maxLink = 110;
  const maxLink2 = maxLink * maxLink;

  for (let i = 0; i < n; i++) {
    const gx = Math.floor(particles[i].px / cell);
    const gy = Math.floor(particles[i].py / cell);
    const candidates: { j: number; d2: number }[] = [];

    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        const bucket = grid.get(`${gx + ox}:${gy + oy}`);
        if (!bucket) continue;
        for (const j of bucket) {
          if (j <= i) continue;
          const dx = particles[i].px - particles[j].px;
          const dy = particles[i].py - particles[j].py;
          const d2 = dx * dx + dy * dy;
          // Prefer medium-length spans so filaments read clearly.
          if (d2 > maxLink2 || d2 < 80) continue;
          candidates.push({ j, d2 });
        }
      }
    }

    candidates.sort((a, b) => a.d2 - b.d2);
    let added = 0;
    for (const c of candidates) {
      if (added >= 3) break;
      const edgeKey = `${i}:${c.j}`;
      if (linked.has(edgeKey)) continue;
      linked.add(edgeKey);
      const seed = i * 19.37 + c.j * 7.13;
      const ri = Math.hypot(particles[i].px - OX, particles[i].py - OY);
      const rj = Math.hypot(particles[c.j].px - OX, particles[c.j].py - OY);
      filaments.push({
        i,
        j: c.j,
        bend: 0,
        vel: 0,
        phase: hash(seed + 1.1) * Math.PI * 2,
        windCycles: CFG.windCyclesMin + ((hash(seed + 2.7) * windSpan) | 0),
        ampJ: 0.75 + hash(seed + 4.8) * 0.8,
        radial: (ri + rj) * 0.5 / maxR,
      });
      added++;
    }
  }

  const outerIdx = particles.map((p, i) => (p.outer ? i : -1)).filter((i) => i >= 0);

  return { particles, filaments, outerIdx, maxR };
}

export function AnatomicalHeart({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enablePointerFx = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const built = buildCloud();
    const particles = built.particles;
    const filaments = built.filaments;
    const outerIdx = built.outerIdx.length ? built.outerIdx : particles.map((_, i) => i);

    const mouse = { x: -9999, y: -9999, active: false, vx: 0, vy: 0, px: -9999, py: -9999 };
    let W = 0;
    let H = 0;
    let cx = 0;
    let cy = 0;
    let sc = 1;
    let loopT = 0;
    let labels: Label[] = [];
    let batchEndAt = 0;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const labelFontPx = () => {
      if (W >= 1280) return 14;
      if (W >= 1024) return 12;
      if (W >= 768) return 11;
      if (W >= 480) return 10;
      return 9;
    };

    const layout = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W * 0.5;
      cy = H * 0.5;
      sc = Math.min((H * 0.82) / 860, (W * 0.85) / 540);
    };

    const syncDots = (t: number, breathe: number) => {
      for (const p of particles) {
        const waveX = Math.sin(t * 0.42 + p.phase) * p.drift * 1.4 * breathe;
        const waveY = Math.cos(t * 0.36 + p.phase * 1.2) * p.drift * 1.15 * breathe;
        p.sx = cx + (p.px - OX) * sc + waveX;
        p.sy = cy + (p.py - OY) * sc + waveY;
      }
    };

    const pickLabelText = (used: Set<string>) => {
      const pool = TOKENS.filter((tok) => !used.has(tok));
      const src = pool.length ? pool : TOKENS;
      return src[(Math.random() * src.length) | 0];
    };

    const buildLabelBatch = (nowSec: number) => {
      const batchSize = W < 768 ? CFG.labelBatchMobile : CFG.labelBatchDesktop;
      const chosen: { nodeIndex: number; text: string; side: number }[] = [];
      const usedNode = new Set<number>();
      const usedText = new Set<string>();
      let tries = 0;

      while (chosen.length < batchSize && tries < 800) {
        tries++;
        const nodeIndex = outerIdx[(Math.random() * outerIdx.length) | 0];
        if (usedNode.has(nodeIndex)) continue;
        const p = particles[nodeIndex];
        const dx = p.sx - cx;
        const dy = p.sy - cy;
        const len = Math.hypot(dx, dy) || 1;
        const nx = dx / len;
        const side = nx >= 0 ? 1 : -1;

        let ok = true;
        for (const c of chosen) {
          const q = particles[c.nodeIndex];
          if (Math.hypot(p.sx - q.sx, p.sy - q.sy) < CFG.labelMinGapPx) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;

        const text = pickLabelText(usedText);
        chosen.push({ nodeIndex, text, side });
        usedNode.add(nodeIndex);
        usedText.add(text);
      }

      while (chosen.length < batchSize) {
        const nodeIndex = outerIdx[(Math.random() * outerIdx.length) | 0];
        const p = particles[nodeIndex];
        const side = p.sx - cx >= 0 ? 1 : -1;
        const text = pickLabelText(usedText);
        chosen.push({ nodeIndex, text, side });
        usedText.add(text);
      }

      const inOrder = shuffle([...Array(chosen.length).keys()]);
      const outOrder = shuffle([...Array(chosen.length).keys()]);
      const inDelay = new Array(chosen.length).fill(0);
      const outDelay = new Array(chosen.length).fill(0);
      let accIn = 0;
      for (let k = 0; k < chosen.length; k++) {
        inDelay[inOrder[k]] = accIn;
        accIn += rand(CFG.labelInStaggerMin, CFG.labelInStaggerMax);
      }
      const hold = rand(CFG.labelShowHoldMin, CFG.labelShowHoldMax);
      let accOut = accIn + hold;
      for (let k = 0; k < chosen.length; k++) {
        outDelay[outOrder[k]] = accOut;
        accOut += rand(CFG.labelOutStaggerMin, CFG.labelOutStaggerMax);
      }

      labels = chosen.map((c, i) => ({
        ...c,
        inStart: nowSec + inDelay[i],
        inEnd: nowSec + inDelay[i] + CFG.labelInDur,
        outStart: nowSec + outDelay[i],
        outEnd: nowSec + outDelay[i] + CFG.labelOutDur,
      }));
      batchEndAt = Math.max(...labels.map((l) => l.outEnd), nowSec) + CFG.labelBatchGap;
    };

    const labelAlpha = (nowSec: number, lb: Label) => {
      if (nowSec < lb.inStart) return 0;
      if (nowSec < lb.inEnd) return (nowSec - lb.inStart) / Math.max(0.0001, CFG.labelInDur);
      if (nowSec < lb.outStart) return 1;
      if (nowSec < lb.outEnd) return 1 - (nowSec - lb.outStart) / Math.max(0.0001, CFG.labelOutDur);
      return 0;
    };

    const onMove = (e: PointerEvent) => {
      if (!enablePointerFx) return;
      const r = canvas.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        mouse.active = false;
        mouse.vx = mouse.vy = 0;
        return;
      }
      const sx = W / r.width;
      const sy = H / r.height;
      const nx = (e.clientX - r.left) * sx;
      const ny = (e.clientY - r.top) * sy;
      mouse.vx = nx - mouse.px;
      mouse.vy = ny - mouse.py;
      mouse.px = nx;
      mouse.py = ny;
      mouse.x = nx;
      mouse.y = ny;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.vx = mouse.vy = 0;
    };

    layout();
    window.addEventListener("resize", layout);
    if (enablePointerFx) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("blur", onLeave);
    }

    let raf = 0;
    let last = performance.now();
    let visible = true;

    const tick = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      loopT += dt;
      const t = loopT;
      const breathe = reduceMotion ? 0 : 1;
      // Radial pulse phase: 0 at center → 1 at edge, sweeps outward.
      const flowPhase = ((t % CFG.flowPeriod) / CFG.flowPeriod);

      syncDots(t, breathe);

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 1;

      for (const f of filaments) {
        const a = particles[f.i];
        const b = particles[f.j];
        const x1 = a.sx;
        const y1 = a.sy;
        const x2 = b.sx;
        const y2 = b.sy;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        const baseBend =
          Math.sin(flowPhase * Math.PI * 2 * f.windCycles + f.phase) *
          (CFG.windAmpPx * f.ampJ) *
          breathe;

        if (enablePointerFx && mouse.active && !reduceMotion) {
          const hit = pointLineDistanceWithT(mouse.x, mouse.y, x1, y1, x2, y2);
          if (hit.d < CFG.mouseRadius) {
            const fall = Math.pow(1 - hit.d / CFG.mouseRadius, CFG.impulseFalloff);
            const along = Math.sin(Math.PI * hit.t);
            const side = Math.sign((mouse.x - x1) * dy - (mouse.y - y1) * dx) || 1;
            const mouseSpeed = Math.hypot(mouse.vx, mouse.vy);
            const speedGain = Math.min(2.2, 0.55 + mouseSpeed * 0.085);
            f.vel += side * fall * along * CFG.impulseForce * speedGain * dt;
          }
        }

        const acc = -CFG.stiffness * (f.bend - baseBend) - CFG.damping * f.vel;
        f.vel += acc * dt;
        f.bend += f.vel * dt;
        if (f.bend > CFG.maxBendPx) f.bend = CFG.maxBendPx;
        if (f.bend < -CFG.maxBendPx) f.bend = -CFG.maxBendPx;

        const mx = (x1 + x2) * 0.5;
        const my = (y1 + y2) * 0.5;
        const cpx = mx + nx * f.bend * CFG.midBoost;
        const cpy = my + ny * f.bend * CFG.midBoost;

        // Brightness pulse keyed by distance from heart centre (center → out).
        const alpha = pulseAlpha(
          f.radial,
          flowPhase,
          CFG.flowWidth,
          CFG.flowBaseAlpha,
          CFG.flowPeakAlpha,
        );

        ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(4)})`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cpx, cpy, x2, y2);
        ctx.stroke();
      }

      // Steady dots — no per-dot blink.
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 1;
      for (const p of particles) {
        const r = p.outer ? 2.2 : 1.65;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!labels.length || t >= batchEndAt) buildLabelBatch(t);

      const fh = labelFontPx();
      const sansFamily =
        getComputedStyle(document.body).fontFamily ||
        '"Source Sans 3", system-ui, sans-serif';
      ctx.font = `500 ${fh}px ${sansFamily}`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      const radBase = Math.max(34 + CFG.labelPad, fh * 1.2);

      for (const lb of labels) {
        const a = reduceMotion ? (labelAlpha(t, lb) > 0 ? 1 : 0) : labelAlpha(t, lb);
        if (a <= 0.001) continue;
        const p = particles[lb.nodeIndex];
        const dx = p.sx - cx;
        const dy = p.sy - cy;
        const len = Math.hypot(dx, dy) || 1;
        const nx = dx / len;
        const ny = dy / len;
        let x = p.sx + nx * radBase;
        let y = p.sy + ny * radBase;
        if (Math.abs(nx) < 0.35) x += lb.side * 10;
        x = Math.max(CFG.labelClamp, Math.min(W - CFG.labelClamp, x));
        y = Math.max(CFG.labelClamp, Math.min(H - CFG.labelClamp, y));
        ctx.textAlign = lb.side >= 0 ? "left" : "right";
        ctx.globalAlpha = a * 0.95;
        ctx.fillText(lb.text, x, y);
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting;
        if (next && !visible) {
          visible = true;
          last = performance.now();
          if (!raf) raf = requestAnimationFrame(tick);
        } else if (!next && visible) {
          visible = false;
          if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        }
      },
      { rootMargin: "10% 0px", threshold: 0 },
    );
    io.observe(canvas);

    raf = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div className={className} style={{ background: BG, touchAction: "none" }} aria-hidden="true">
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
