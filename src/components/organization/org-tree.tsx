"use client";

import { UserRound } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import type { OrgNode } from "@/lib/content/organogram";

export type { OrgNode };

function NodeCard({
  node,
  open,
  onToggle,
}: {
  node: OrgNode;
  open: boolean;
  onToggle: () => void;
}) {
  const hasKids = (node.children?.length ?? 0) > 0;
  const showPhoto = Boolean(node.image) || node.portrait;

  return (
    <article className="w-full overflow-hidden rounded-md border-2 border-[#1d4f91] bg-white text-center text-[#16325c]">
      {showPhoto ? (
        node.image ? (
          <img
            src={node.image}
            alt={node.imageAlt || node.title}
            className="mx-auto mt-2 h-24 w-[86%] object-cover object-top sm:h-28"
          />
        ) : (
          <div className="mx-auto mt-2 flex h-24 w-[86%] items-center justify-center bg-[#e7eef6] text-[#1d4f91]/45 sm:h-28">
            <UserRound className="size-9" strokeWidth={1.25} aria-hidden="true" />
          </div>
        )
      ) : null}
      {node.href ? (
        <Link
          href={node.href}
          className="mt-2 block px-2 text-[0.78rem] font-bold uppercase leading-tight tracking-wide text-[#1d4f91] hover:underline sm:text-[0.84rem]"
        >
          {node.title}
        </Link>
      ) : (
        <h3 className="mt-2 px-2 text-[0.78rem] font-bold uppercase leading-tight tracking-wide text-[#1d4f91] sm:text-[0.84rem]">
          {node.title}
        </h3>
      )}
      {node.subtitle ? (
        <p className="mt-1 whitespace-pre-line px-2 text-[0.72rem] leading-snug text-[#3c4d63]">{node.subtitle}</p>
      ) : null}
      {hasKids ? (
        <button
          type="button"
          className="mx-auto my-2 inline-flex size-7 items-center justify-center rounded-[2px] bg-[#1d4f91] text-base leading-none text-white"
          aria-expanded={open}
          aria-label={open ? `Κλείσιμο: ${node.title}` : `Οργάνωση: ${node.title}`}
          onClick={onToggle}
        >
          {open ? "–" : "+"}
        </button>
      ) : (
        <div className="h-2" />
      )}
    </article>
  );
}

function Level({
  nodes,
  openIds,
  toggle,
}: {
  nodes: OrgNode[];
  openIds: Set<string>;
  toggle: (id: string) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [singleLine, setSingleLine] = useState(false);

  useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const measure = () => {
      const slots = [...el.querySelectorAll<HTMLElement>(":scope > [data-org-slot]")];
      if (slots.length <= 1) {
        setSingleLine(true);
        return;
      }
      const top = slots[0].offsetTop;
      const oneRow = slots.every((slot) => Math.abs(slot.offsetTop - top) < 2);
      const overflows = el.scrollWidth > el.clientWidth + 1;
      setSingleLine(oneRow && !overflows);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [nodes]);

  const opened = nodes.filter((node) => openIds.has(node.id) && (node.children?.length ?? 0) > 0);

  return (
    <div className="w-full max-w-full">
      <div aria-hidden="true" className="mx-auto h-5 w-px bg-[#1d4f91]" />
      <div
        ref={rowRef}
        className={singleLine ? "org-row org-row-line" : "org-row"}
      >
        {nodes.map((node) => (
          <div key={node.id} data-org-slot className="org-slot">
            {!singleLine ? <span aria-hidden="true" className="mb-0 h-3 w-px bg-[#1d4f91]" /> : null}
            <NodeCard node={node} open={openIds.has(node.id)} onToggle={() => toggle(node.id)} />
          </div>
        ))}
      </div>
      {opened.map((node) => (
        <Level key={node.id} nodes={node.children!} openIds={openIds} toggle={toggle} />
      ))}
    </div>
  );
}

export function OrgTree({ root }: { root: OrgNode }) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(["nnk", "dioikitis"]));

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="org-chart mx-auto w-full max-w-full" aria-label="Οργανόγραμμα Ναυτικού Νοσοκομείου Κρήτης">
      <div className="mx-auto w-[min(100%,12.5rem)]">
        <NodeCard node={root} open={openIds.has(root.id)} onToggle={() => toggle(root.id)} />
      </div>
      {openIds.has(root.id) && root.children?.length ? (
        <Level nodes={root.children} openIds={openIds} toggle={toggle} />
      ) : null}
    </div>
  );
}
