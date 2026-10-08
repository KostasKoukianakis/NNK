"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type OrgNode = {
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
  children?: OrgNode[];
};

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

  return (
    <div
      className={cn(
        "flex w-[12.5rem] flex-col items-center rounded-[3px] bg-white px-3 py-3 text-center text-[var(--blue)] shadow-sm",
        open && hasKids && "ring-2 ring-[#6FE3FF]",
      )}
    >
      {node.href ? (
        <Link href={node.href} className="text-sm font-medium leading-tight hover:underline">
          {node.title}
        </Link>
      ) : (
        <p className="text-sm font-medium leading-tight">{node.title}</p>
      )}
      {node.subtitle ? (
        <p className="mt-1 text-[0.7rem] leading-snug text-[var(--blue)]/65">{node.subtitle}</p>
      ) : null}
      {hasKids ? (
        <button
          type="button"
          className="mt-2 inline-flex size-7 items-center justify-center rounded-[2px] bg-[var(--blue)] text-base leading-none text-white"
          aria-expanded={open}
          aria-label={open ? `Κλείσιμο: ${node.title}` : `Οργάνωση: ${node.title}`}
          onClick={onToggle}
        >
          {open ? "–" : "+"}
        </button>
      ) : null}
    </div>
  );
}

function Branch({
  node,
  openIds,
  toggle,
}: {
  node: OrgNode;
  openIds: Set<string>;
  toggle: (id: string) => void;
}) {
  const hasKids = (node.children?.length ?? 0) > 0;
  const open = openIds.has(node.id);

  return (
    <li>
      <NodeCard node={node} open={open} onToggle={() => toggle(node.id)} />
      {hasKids && open ? (
        <ul>
          {node.children!.map((child) => (
            <Branch key={child.id} node={child} openIds={openIds} toggle={toggle} />
          ))}
        </ul>
      ) : null}
    </li>
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
    <ul className="org-tree" aria-label="Οργανόγραμμα Ναυτικού Νοσοκομείου Κρήτης">
      <Branch node={root} openIds={openIds} toggle={toggle} />
    </ul>
  );
}
