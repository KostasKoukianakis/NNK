"use client";

import { UserRound } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { OrgTree } from "@/components/organization/org-tree";
import { findOrgNode, listOrgIds, type OrgNode } from "@/lib/content/organogram";

const ease = [0.16, 1, 0.3, 1] as const;

const slide = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%" }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? "-100%" : "100%" }),
};

export function OrgBoard({ root }: { root: OrgNode }) {
  const ids = listOrgIds(root);
  const [activeId, setActiveId] = useState(root.id);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const node = findOrgNode(activeId, root) ?? root;

  function select(id: string) {
    if (id === activeId) return;
    const next = ids.indexOf(id);
    const current = ids.indexOf(activeId);
    setDirection(next > current ? 1 : -1);
    setActiveId(id);
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(16rem,28rem)_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-white/30 bg-white/15 px-3 py-6 shadow-[0_12px_40px_rgba(2,16,48,0.18)] backdrop-blur-xl sm:px-4">
        <p className="mb-4 px-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-white/80">
          Διάλεξε θέση
        </p>
        <OrgTree root={root} activeId={activeId} compact onSelect={select} />
      </aside>

      <div className="relative h-[calc(100dvh-16rem)] min-h-[28rem] overflow-hidden lg:h-[calc(100dvh-17rem)]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.article
            key={node.id}
            custom={direction}
            variants={reduceMotion ? undefined : slide}
            initial={reduceMotion ? { opacity: 0 } : "enter"}
            animate={reduceMotion ? { opacity: 1 } : "center"}
            exit={reduceMotion ? { opacity: 0 } : "exit"}
            transition={{ duration: reduceMotion ? 0.15 : 0.45, ease }}
            className="absolute inset-0 flex flex-col text-white"
          >
            <div className="grid shrink-0 gap-8 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:items-end">
              {node.image ? (
                <img
                  src={node.image}
                  alt={node.imageAlt || node.name || node.title}
                  className="aspect-[4/5] w-full max-w-[10.5rem] object-cover object-top"
                />
              ) : (
                <div className="flex aspect-[4/5] w-full max-w-[10.5rem] items-center justify-center bg-white/10 text-white/70">
                  <UserRound className="size-14" strokeWidth={1.15} aria-hidden="true" />
                </div>
              )}
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-white/70">{node.title}</p>
                {node.rank ? <p className="mt-2 text-sm text-white/80">{node.rank}</p> : null}
                {node.name ? (
                  <p className="mt-1 text-2xl font-medium leading-tight">{node.name}</p>
                ) : (
                  <p className="mt-2 max-w-sm text-sm leading-snug text-white/70">
                    Το ονοματεπώνυμο συμπληρώνεται όταν οριστεί το στέλεχος.
                  </p>
                )}
              </div>
            </div>
            <div className="mt-8 min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-color:rgba(255,255,255,0.45)_transparent]">
              <p className="text-[clamp(1.35rem,2.2vw,2rem)] font-medium leading-snug">{node.bio}</p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
