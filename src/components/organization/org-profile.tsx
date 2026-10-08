"use client";

import { UserRound, X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { OrgNode } from "@/lib/content/organogram";

export function OrgProfile({ node, onClose }: { node: OrgNode; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="org-profile"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onClose={onClose}
    >
      <div className="relative grid gap-8 p-6 sm:grid-cols-[12.5rem_minmax(0,1fr)] sm:gap-10 sm:p-10">
        <button
          type="button"
          className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-md text-[#044ab3] hover:bg-[#044ab3]/8"
          onClick={onClose}
        >
          <span className="sr-only">Κλείσιμο</span>
          <X className="size-5" aria-hidden="true" />
        </button>

        <div>
          {node.image ? (
            <img
              src={node.image}
              alt={node.imageAlt || node.name || node.title}
              className="aspect-[4/5] w-full object-cover object-top"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#e7eef6] text-[#1d4f91]/45">
              <UserRound className="size-16" strokeWidth={1.15} aria-hidden="true" />
            </div>
          )}
          <p id={titleId} className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-[#044ab3]">
            {node.title}
          </p>
          {node.rank ? <p className="mt-2 text-sm text-[#044ab3]/80">{node.rank}</p> : null}
          {node.name ? (
            <p className="mt-1 text-lg font-medium leading-tight text-[#044ab3]">{node.name}</p>
          ) : (
            <p className="mt-2 text-sm leading-snug text-[#044ab3]/70">
              Το ονοματεπώνυμο συμπληρώνεται όταν οριστεί το στέλεχος.
            </p>
          )}
        </div>

        <p className="self-center text-[clamp(1.35rem,2.3vw,2.05rem)] font-medium leading-snug text-[#044ab3]">
          {node.bio}
        </p>
      </div>
    </dialog>,
    document.body,
  );
}
