"use client";

import { UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { OrgNode } from "@/lib/content/organogram";
import { cn } from "@/lib/utils";

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
    <article className="w-[min(100%,18.5rem)] overflow-hidden rounded-md border-2 border-[#1d4f91] bg-white text-center text-[#16325c]">
      {showPhoto ? (
        node.image ? (
          <img
            src={node.image}
            alt={node.imageAlt || node.title}
            className="mx-auto mt-3 h-40 w-[86%] object-cover object-top"
          />
        ) : (
          <div className="mx-auto mt-3 flex h-40 w-[86%] items-center justify-center bg-[#e7eef6] text-[#1d4f91]/45">
            <UserRound className="size-12" strokeWidth={1.25} aria-hidden="true" />
          </div>
        )
      ) : null}
      {node.href ? (
        <Link
          href={node.href}
          className="mt-3 block px-4 text-[0.95rem] font-bold uppercase leading-tight tracking-wide text-[#1d4f91] hover:underline"
        >
          {node.title}
        </Link>
      ) : (
        <h3 className="mt-3 px-4 text-[0.95rem] font-bold uppercase leading-tight tracking-wide text-[#1d4f91]">
          {node.title}
        </h3>
      )}
      {node.subtitle ? (
        <p className="mt-1 whitespace-pre-line px-4 text-sm leading-snug text-[#3c4d63]">{node.subtitle}</p>
      ) : null}
      {hasKids ? (
        <button
          type="button"
          className={cn(
            "mx-auto my-3 inline-flex size-8 items-center justify-center rounded-[2px] bg-[#1d4f91] text-lg leading-none text-white",
          )}
          aria-expanded={open}
          aria-label={open ? `Κλείσιμο: ${node.title}` : `Οργάνωση: ${node.title}`}
          onClick={onToggle}
        >
          {open ? "–" : "+"}
        </button>
      ) : (
        <div className="h-3" />
      )}
    </article>
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
    <div className="flex w-full flex-col items-center">
      <NodeCard node={node} open={open} onToggle={() => toggle(node.id)} />
      {hasKids && open
        ? node.children!.map((child) => (
            <div key={child.id} className="flex w-full flex-col items-center">
              <span aria-hidden="true" className="h-6 w-px bg-[#1d4f91]" />
              <Branch node={child} openIds={openIds} toggle={toggle} />
            </div>
          ))
        : null}
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
    <div className="mx-auto w-full max-w-md" aria-label="Οργανόγραμμα Ναυτικού Νοσοκομείου Κρήτης">
      <Branch node={root} openIds={openIds} toggle={toggle} />
    </div>
  );
}
