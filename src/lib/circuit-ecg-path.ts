/**
 * Cantor stepped route (bottom-left → top-right) with soft ECG on horizontal runs.
 * Shared by foundation and CTA sections.
 */
export function ecgRun(
  x0: number,
  x1: number,
  y: number,
  amp: number,
  period = 220,
) {
  const dir = x1 >= x0 ? 1 : -1;
  const span = Math.abs(x1 - x0);
  let d = "";
  let traveled = 0;
  let x = x0;

  while (traveled < span - 12) {
    const remain = span - traveled;
    const p = Math.min(period, remain);
    if (p < 40) break;
    const s = dir;

    d += ` L${x + s * p * 0.18} ${y}`;
    d += ` C${x + s * p * 0.22} ${y} ${x + s * p * 0.24} ${y - amp * 0.22} ${x + s * p * 0.28} ${y - amp * 0.22}`;
    d += ` C${x + s * p * 0.32} ${y - amp * 0.22} ${x + s * p * 0.34} ${y} ${x + s * p * 0.38} ${y}`;
    d += ` L${x + s * p * 0.44} ${y}`;
    d += ` C${x + s * p * 0.46} ${y} ${x + s * p * 0.47} ${y + amp * 0.14} ${x + s * p * 0.49} ${y + amp * 0.12}`;
    d += ` C${x + s * p * 0.51} ${y + amp * 0.08} ${x + s * p * 0.52} ${y - amp * 0.85} ${x + s * p * 0.55} ${y - amp}`;
    d += ` C${x + s * p * 0.58} ${y - amp * 0.85} ${x + s * p * 0.59} ${y + amp * 0.22} ${x + s * p * 0.62} ${y + amp * 0.28}`;
    d += ` C${x + s * p * 0.64} ${y + amp * 0.18} ${x + s * p * 0.66} ${y} ${x + s * p * 0.68} ${y}`;
    d += ` L${x + s * p * 0.74} ${y}`;
    d += ` C${x + s * p * 0.78} ${y} ${x + s * p * 0.8} ${y - amp * 0.32} ${x + s * p * 0.85} ${y - amp * 0.34}`;
    d += ` C${x + s * p * 0.9} ${y - amp * 0.32} ${x + s * p * 0.92} ${y} ${x + s * p * 0.96} ${y}`;
    d += ` L${x + s * p} ${y}`;

    x += s * p;
    traveled += p;
  }

  d += ` L${x1} ${y}`;
  return d;
}

export function buildCircuitEcg(offset = 0, amp = 36) {
  const y1 = 913.5 + offset;
  const y2 = 482.5 + offset * 0.35;
  const y3 = 227.5 + offset * 0.2;
  const y4 = 325.5 + offset * 0.15;
  const y5 = 20.5 + offset * 0.05;

  const xA = -40 - offset * 0.5;
  const xB = 624;
  const xC = 654;
  const xD = 935;
  const xE = 955;
  const xF = 1573.5;
  const xG = 1593.5;
  const xH = 1734.5;
  const xI = 1754.5;
  const xJ = 2200;

  let d = `M${xA} ${y1}`;
  d += ecgRun(xA, xB, y1, amp, 240);
  d += ` C${xB + 11} ${y1} ${xC} ${y1 - 9} ${xC} ${y1 - 20}`;
  d += ` L${xC} ${y2 + 11}`;
  d += ` C${xC} ${y2} ${xC + 9} ${y2 - 9} ${xC + 20} ${y2 - 9}`;
  d += ecgRun(xC + 20, xD, y2 - 9, amp * 0.7, 220);
  d += ` C${xD + 11} ${y2 - 9} ${xE} ${y2 - 18} ${xE} ${y2 - 29}`;
  d += ` L${xE} ${y3 + 11}`;
  d += ` C${xE} ${y3} ${xE + 9} ${y3 - 9} ${xE + 20} ${y3 - 9}`;
  d += ecgRun(xE + 20, xF, y3 - 9, amp * 0.6, 230);
  d += ` C${xF + 11} ${y3 - 9} ${xG} ${y3} ${xG} ${y3 + 11}`;
  d += ` L${xG} ${y4 - 11}`;
  d += ` C${xG} ${y4} ${xG + 9} ${y4 + 9} ${xG + 20} ${y4 + 9}`;
  d += ecgRun(xG + 20, xH, y4 + 9, amp * 0.4, 200);
  d += ` C${xH + 11} ${y4 + 9} ${xI} ${y4} ${xI} ${y4 - 11}`;
  d += ` L${xI} ${y5 + 11}`;
  d += ` C${xI} ${y5} ${xI + 9} ${y5 - 9} ${xI + 20} ${y5 - 9}`;
  d += ecgRun(xI + 20, xJ, y5 - 9, amp * 0.32, 210);

  return d;
}

export const CIRCUIT_ECG_MAIN = buildCircuitEcg(0, 34);
export const CIRCUIT_ECG_SUB = buildCircuitEcg(28, 26);

/** Foundation circuit SVG viewBox */
export const CIRCUIT_ECG_VIEWBOX = "-80 -30 2240 980";

/**
 * Cantor CTA corridor layout (same corners / steps as cantor8.io),
 * with ECG on horizontal spans instead of flat H lines.
 * `o` = parallel offset (0 ≈ main, ~20 ≈ twin).
 */
export function buildCtaCorridorLower(o = 0, amp = 28) {
  const yA = 1146.5 + o;
  const yB = 976 + o;
  const yC = 721 + o;
  const yD = 859 + o;
  const yE = 514 + o;

  const x0 = 2174.5 - o;
  const x1 = 1530.5 - o;
  const x2 = 1490.5 - o;
  const x3 = 1224.5 - o;
  const x4 = 1184.5 - o;
  const x5 = 721 - o;
  const x6 = 681 - o;
  const x7 = 430 - o;
  const x8 = 390 - o;
  const x9 = -98 - o;

  let d = `M${x0} ${yA}`;
  d += ecgRun(x0, x1, yA, amp, 200);
  d += ` C${x1 - 11} ${yA} ${x1 - 20} ${yA - 9} ${x1 - 20} ${yA - 20}`;
  d += ` L${x1 - 20} ${yB + 20}`;
  d += ` C${x1 - 20} ${yB + 9} ${x1 - 29} ${yB} ${x2} ${yB}`;
  d += ecgRun(x2, x3, yB, amp * 0.7, 180);
  d += ` C${x3 - 11} ${yB} ${x3 - 20} ${yB - 9} ${x3 - 20} ${yB - 20}`;
  d += ` L${x3 - 20} ${yC + 20}`;
  d += ` C${x3 - 20} ${yC + 9} ${x3 - 29} ${yC} ${x4} ${yC}`;
  d += ecgRun(x4, x5, yC, amp * 0.85, 200);
  d += ` C${x5 - 11} ${yC} ${x5 - 20} ${yC + 9} ${x5 - 20} ${yC + 20}`;
  d += ` L${x5 - 20} ${yD - 20}`;
  d += ` C${x5 - 20} ${yD - 9} ${x5 - 29} ${yD} ${x6} ${yD}`;
  d += ecgRun(x6, x7, yD, amp * 0.55, 160);
  d += ` C${x7 - 11} ${yD} ${x7 - 20} ${yD - 9} ${x7 - 20} ${yD - 20}`;
  d += ` L${x7 - 20} ${yE + 20}`;
  d += ` C${x7 - 20} ${yE + 9} ${x7 - 29} ${yE} ${x8} ${yE}`;
  d += ecgRun(x8, x9, yE, amp * 0.4, 180);

  return d;
}

export function buildCtaCorridorUpper(o = 0, amp = 28) {
  const yA = 216 + o;
  const yB = 426.5 + o;
  const yC = 681.5 + o;
  const yD = 543.5 + o;
  const yE = 888.5 + o;

  const x0 = -398 + o;
  const x1 = 246 + o;
  const x2 = 286 + o;
  const x3 = 547 + o;
  const x4 = 587 + o;
  const x5 = 1185.5 + o;
  const x6 = 1225.5 + o;
  const x7 = 1490.5 + o;
  const x8 = 1530.5 + o;
  const x9 = 2254.5 + o;

  let d = `M${x0} ${yA}`;
  d += ecgRun(x0, x1, yA, amp * 0.45, 180);
  d += ` C${x1 + 11} ${yA} ${x1 + 20} ${yA + 9} ${x1 + 20} ${yA + 20}`;
  d += ` L${x1 + 20} ${yB - 20}`;
  d += ` C${x1 + 20} ${yB - 9} ${x1 + 29} ${yB} ${x2} ${yB}`;
  d += ecgRun(x2, x3, yB, amp * 0.55, 160);
  d += ` C${x3 + 11} ${yB} ${x3 + 20} ${yB + 9} ${x3 + 20} ${yB + 20}`;
  d += ` L${x3 + 20} ${yC - 20}`;
  d += ` C${x3 + 20} ${yC - 9} ${x3 + 29} ${yC} ${x4} ${yC}`;
  d += ecgRun(x4, x5, yC, amp * 0.75, 200);
  d += ` C${x5 + 11} ${yC} ${x5 + 20} ${yC - 9} ${x5 + 20} ${yC - 20}`;
  d += ` L${x5 + 20} ${yD + 20}`;
  d += ` C${x5 + 20} ${yD + 9} ${x5 + 29} ${yD} ${x6} ${yD}`;
  d += ecgRun(x6, x7, yD, amp * 0.5, 160);
  d += ` C${x7 + 11} ${yD} ${x7 + 20} ${yD + 9} ${x7 + 20} ${yD + 20}`;
  d += ` L${x7 + 20} ${yE - 20}`;
  d += ` C${x7 + 20} ${yE - 9} ${x7 + 29} ${yE} ${x8} ${yE}`;
  d += ecgRun(x8, x9, yE, amp * 0.65, 200);

  return d;
}

export const CTA_ECG_PATHS = [
  buildCtaCorridorLower(0, 30),
  buildCtaCorridorLower(20, 22),
  buildCtaCorridorUpper(0, 30),
  buildCtaCorridorUpper(20, 22),
] as const;

export const CTA_ECG_VIEWBOX = "0 0 1920 1190";
