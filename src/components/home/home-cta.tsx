"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { CtaLink } from "@/components/ui/button";
import { HOSPITAL } from "@/lib/constants";
import { CTA_ECG_PATHS, CTA_ECG_VIEWBOX } from "@/lib/circuit-ecg-path";

gsap.registerPlugin(ScrollTrigger);

/** Coral accent on ECG labels — contrasts with blue corridors. */
const CAPTION_CORAL = "#D45D4F";

const CAPTIONS = [
  {
    text: "ΝΑΥΣΤΑΘΜΟΣ ΣΟΥΔΑΣ",
    x: 200,
    y: 578,
    anchor: "start" as const,
    cls: "cta-cap--1",
  },
  {
    text: `ΓΡΑΜΜΑΤΕΙΑ ${HOSPITAL.phones.secretariat}`,
    x: 440,
    y: 486,
    anchor: "start" as const,
    cls: "cta-cap--2",
  },
  {
    text: "ΔΕΥ–ΠΑΡ 08:00–14:00",
    x: 1436,
    y: 598,
    anchor: "middle" as const,
    cls: "cta-cap--3",
  },
  {
    text: `ΕΠΕΙΓΟΝΤΑ ${HOSPITAL.phones.emergency[0]}`,
    x: 1346,
    y: 948,
    anchor: "middle" as const,
    cls: "cta-cap--4",
  },
] as const;

function pathLen(el: SVGPathElement) {
  try {
    return el.getTotalLength();
  } catch {
    return 0;
  }
}

export function HomeCta({ eager = false }: { eager?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const svg = root.querySelector<SVGSVGElement>(".cta-lines-svg");
    const basePaths = svg
      ? Array.from(svg.querySelectorAll<SVGPathElement>(".cta-base"))
      : [];
    const pulsePaths = svg
      ? Array.from(svg.querySelectorAll<SVGPathElement>(".cta-pulse-path"))
      : [];
    const caps = svg ? Array.from(svg.querySelectorAll<SVGTextElement>(".cta-cap")) : [];

    const mobileNoDraw =
      typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    const instant = Boolean(reduceMotion) || mobileNoDraw;

    const ctx = gsap.context(() => {
      let started = false;

      function showCaptions() {
        gsap.to(caps, {
          opacity: 1,
          duration: eager ? 0.28 : 0.55,
          stagger: eager ? 0.04 : 0.1,
          ease: "power2.out",
        });
      }

      function startPulseLoops() {
        pulsePaths.forEach((p, i) => {
          const len = pathLen(p);
          if (!len) return;
          const seg = Math.max(48, len * 0.045);
          p.style.strokeDasharray = `${seg} ${len}`;
          p.style.strokeDashoffset = "0";
          gsap.set(p, { opacity: 1 });
          gsap.to(p, {
            strokeDashoffset: -(len + seg),
            duration: 3.4 + i * 0.15,
            ease: "none",
            repeat: -1,
          });
        });
      }

      function drawLinesThenLoop(skipDraw: boolean) {
        if (skipDraw) {
          basePaths.forEach((p) => {
            gsap.set(p, { clearProps: "strokeDasharray,strokeDashoffset" });
          });
          showCaptions();
          startPulseLoops();
          return;
        }

        basePaths.forEach((p) => {
          const len = pathLen(p);
          if (!len) return;
          p.style.strokeDasharray = String(len);
          p.style.strokeDashoffset = String(len);
        });

        const draw = eager ? 0.95 : 2.75;
        const stagger = eager ? 0.05 : 0.18;

        const tl = gsap.timeline({
          onComplete: () => {
            basePaths.forEach((p) => {
              p.style.strokeDasharray = "";
              p.style.strokeDashoffset = "";
            });
            if (!eager) showCaptions();
            startPulseLoops();
          },
        });

        if (eager) tl.call(showCaptions, undefined, 0.12);

        basePaths.forEach((p, i) => {
          const len = pathLen(p);
          if (!len) return;
          tl.to(
            p,
            { strokeDashoffset: 0, duration: draw, ease: "power2.inOut" },
            i * stagger,
          );
        });
      }

      function runOnce() {
        if (started) return;
        started = true;
        drawLinesThenLoop(instant);
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top 85%",
        once: true,
        onEnter: runOnce,
      });

      if (root.getBoundingClientRect().top < window.innerHeight * 0.85) {
        runOnce();
      }
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, eager]);

  return (
    <section
      id="cta"
      ref={rootRef}
      className={`cta-box bg-white text-[var(--blue)]${eager ? " cta-box--eager" : ""}`}
    >
      <div className="wrapper-cta">
        <div className="flex-cta relative z-[2]">
          <div className="tagline-cta">
            <div className="tag-txt">
              <span className="cube-tag" aria-hidden="true" />
              <span>ας ξεκινήσουμε</span>
            </div>
          </div>

          <div className="heading-cta">
            <h2 className="cta-h2">
              Κλείστε ραντεβού
              <br />
              με το ΝΝΚ Σούδας
            </h2>
            <div className="button-wrap">
              <CtaLink href="/contact" variant="default" className="cta-btn-blue">
                Επικοινωνία
              </CtaLink>
            </div>
          </div>
        </div>

        <div className="cta-lines" aria-hidden="true">
          <svg
            className="cta-lines-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={CTA_ECG_VIEWBOX}
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient
                id="ctaPaint0"
                x1="3.06343"
                y1="883"
                x2="1922"
                y2="883.001"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#044AB3" stopOpacity="0" />
                <stop offset="0.5" stopColor="#044AB3" />
                <stop offset="1" stopColor="#044AB3" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="ctaPaint1"
                x1="-16.9366"
                y1="903"
                x2="1902"
                y2="903.001"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#044AB3" stopOpacity="0" />
                <stop offset="0.5" stopColor="#044AB3" />
                <stop offset="1" stopColor="#044AB3" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="ctaPaint2"
                x1="1917"
                y1="563.863"
                x2="4.49983"
                y2="563.862"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#044AB3" stopOpacity="0" />
                <stop offset="0.5" stopColor="#044AB3" />
                <stop offset="1" stopColor="#044AB3" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="ctaPaint3"
                x1="1937"
                y1="583.863"
                x2="24.4998"
                y2="583.862"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#044AB3" stopOpacity="0" />
                <stop offset="0.5" stopColor="#044AB3" />
                <stop offset="1" stopColor="#044AB3" stopOpacity="0" />
              </linearGradient>
              <clipPath id="ctaClip0">
                <rect width="1920" height="1190" />
              </clipPath>
            </defs>

            <g className="cta-base-group" clipPath="url(#ctaClip0)">
              {CTA_ECG_PATHS.map((d, i) => (
                <path
                  key={`base-${i}`}
                  className="cta-base"
                  d={d}
                  stroke={`url(#ctaPaint${i})`}
                  strokeWidth={1}
                  strokeOpacity={i % 2 === 1 ? 0.35 : 1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              ))}
            </g>

            <g className="cta-pulse-group" clipPath="url(#ctaClip0)">
              {CTA_ECG_PATHS.map((d, i) => (
                <path
                  key={`pulse-${i}`}
                  className="cta-pulse-path"
                  d={d}
                  stroke="#044AB3"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity={i % 2 === 1 ? 0.9 : 1}
                  fill="none"
                  opacity={0}
                />
              ))}
            </g>

            <g
              className="cta-captions-svg"
              pointerEvents="none"
              fill={CAPTION_CORAL}
              fontFamily="var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace"
              fontWeight={700}
            >
              {CAPTIONS.map((cap) => (
                <text
                  key={cap.cls}
                  className={`cta-cap ${cap.cls}`}
                  opacity={0}
                  letterSpacing="0.08em"
                  textAnchor={cap.anchor}
                  x={cap.x}
                  y={cap.y}
                >
                  {cap.text}
                </text>
              ))}
            </g>
          </svg>
        </div>

        <div className="paragraph-last relative z-[2]">
          <p className="cta-p">
            Ενιαία υγειονομική κάλυψη για τους δικαιούχους στη Σούδα και την Κρήτη. Από τα
            εξωτερικά ιατρεία έως την υπερβαρική, με σαφή ροή από το ραντεβού έως την περίθαλψη.
          </p>
        </div>
      </div>
    </section>
  );
}
