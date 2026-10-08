"use client";

import { UserRound } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import type { OrgNode } from "@/lib/content/organogram";
import { OrgProfile } from "@/components/organization/org-profile";

export type { OrgNode };

function NodeCard({ node, onOpen }: { node: OrgNode; onOpen: (node: OrgNode) => void }) {
  const showPhoto = Boolean(node.image) || node.portrait;

  return (
    <button
      type="button"
      onClick={() => onOpen(node)}
      className="w-[11.5rem] max-w-full cursor-pointer overflow-hidden rounded-md border-2 border-[#1d4f91] bg-white text-center text-[#16325c] transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4f91]"
    >
      {showPhoto ? (
        node.image ? (
          <img
            src={node.image}
            alt=""
            className="mx-auto mt-3 h-28 w-[86%] object-cover object-top"
          />
        ) : (
          <span className="mx-auto mt-3 flex h-28 w-[86%] items-center justify-center bg-[#e7eef6] text-[#1d4f91]/45">
            <UserRound className="size-10" strokeWidth={1.25} aria-hidden="true" />
          </span>
        )
      ) : null}
      <span className="mt-3 block px-3 text-[0.95rem] font-bold uppercase leading-tight tracking-wide text-[#1d4f91]">
        {node.title}
      </span>
      {node.subtitle ? (
        <span className="mt-1 block whitespace-pre-line px-3 pb-3 text-sm font-normal leading-snug text-[#3c4d63]">
          {node.subtitle}
        </span>
      ) : (
        <span className="block h-3" />
      )}
      <span className="sr-only">Άνοιγμα προφίλ</span>
    </button>
  );
}

function Branch({ node, onOpen }: { node: OrgNode; onOpen: (node: OrgNode) => void }) {
  const children = node.children ?? [];

  return (
    <div className="org-branch flex w-max flex-col items-center">
      <NodeCard node={node} onOpen={onOpen} />
      {children.length > 0 ? (
        <div className="org-children flex w-max flex-col items-center">
          <span aria-hidden="true" className="org-stem h-4 w-px bg-[#1d4f91]" />
          <div className="org-row org-row-line">
            {children.map((child) => (
              <div key={child.id} className="org-slot">
                <Branch node={child} onOpen={onOpen} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function OrgTree({ root }: { root: OrgNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState<OrgNode | null>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const tree = treeRef.current;
    if (!frame || !tree) return;

    const measure = () => {
      const previous = tree.style.zoom;
      tree.style.zoom = "1";
      const needed = tree.scrollWidth;
      tree.style.zoom = previous;
      const available = frame.clientWidth;
      const next = needed > 0 ? Math.min(1, available / needed) : 1;
      setZoom((current) => (Math.abs(current - next) < 0.01 ? current : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [root]);

  return (
    <div ref={frameRef} className="org-chart w-full overflow-x-clip">
      <div
        ref={treeRef}
        className="mx-auto w-max"
        style={{ zoom }}
        aria-label="Οργανόγραμμα Ναυτικού Νοσοκομείου Κρήτης"
      >
        <Branch node={root} onOpen={setSelected} />
      </div>
      {selected ? <OrgProfile node={selected} onClose={() => setSelected(null)} /> : null}
    </div>
  );
}
