"use client";

import { UserRound } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import type { OrgNode } from "@/lib/content/organogram";
import { orgPath } from "@/lib/content/organogram";
import { cn } from "@/lib/utils";

export type { OrgNode };

function NodeCard({
  node,
  active,
  onPath,
  compact,
  onSelect,
}: {
  node: OrgNode;
  active: boolean;
  onPath: boolean;
  compact: boolean;
  onSelect: (id: string) => void;
}) {
  const showPhoto = Boolean(node.image) || node.portrait;

  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      aria-current={active ? "true" : undefined}
      className={cn(
        "block max-w-full cursor-pointer overflow-hidden rounded-md border-2 text-center transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4f91]",
        compact ? "w-[7.25rem]" : "w-[11.5rem]",
        active
          ? "border-[#044ab3] bg-[#044ab3] text-white shadow-md"
          : onPath
            ? "border-[#044ab3] bg-[#e7f0fb] text-[#16325c]"
            : "border-[#1d4f91] bg-white text-[#16325c]",
      )}
    >
      {showPhoto ? (
        node.image ? (
          <img
            src={node.image}
            alt=""
            className={cn(
              "mx-auto w-[86%] object-cover object-top",
              compact ? "mt-2 h-14" : "mt-3 h-28",
            )}
          />
        ) : (
          <span
            className={cn(
              "mx-auto flex w-[86%] items-center justify-center",
              compact ? "mt-2 h-14" : "mt-3 h-28",
              active ? "bg-white/15 text-white/80" : "bg-[#e7eef6] text-[#1d4f91]/45",
            )}
          >
            <UserRound className={compact ? "size-6" : "size-10"} strokeWidth={1.25} aria-hidden="true" />
          </span>
        )
      ) : null}
      <span
        className={cn(
          "block font-bold uppercase leading-tight tracking-wide",
          compact ? "mt-2 px-1.5 text-[0.68rem]" : "mt-3 px-3 text-[0.95rem]",
          active ? "text-white" : "text-[#1d4f91]",
        )}
      >
        {node.title}
      </span>
      {node.subtitle ? (
        <span
          className={cn(
            "block whitespace-pre-line font-normal leading-snug",
            compact ? "mt-1 px-1.5 pb-2 text-[0.62rem]" : "mt-1 px-3 pb-3 text-sm",
            active ? "text-white/85" : "text-[#3c4d63]",
          )}
        >
          {node.subtitle}
        </span>
      ) : (
        <span className="block h-3" />
      )}
    </button>
  );
}

function Branch({
  node,
  activeId,
  path,
  compact,
  onSelect,
}: {
  node: OrgNode;
  activeId?: string;
  path: string[];
  compact: boolean;
  onSelect: (id: string) => void;
}) {
  const children = node.children ?? [];
  const onPath = path.includes(node.id);

  return (
    <div className="org-branch flex w-max flex-col items-center">
      <NodeCard
        node={node}
        active={node.id === activeId}
        onPath={onPath && node.id !== activeId}
        compact={compact}
        onSelect={onSelect}
      />
      {children.length > 0 ? (
        <div className="org-children flex w-max flex-col items-center">
          <span
            aria-hidden="true"
            className={cn("org-stem w-px", compact ? "h-3" : "h-4", onPath ? "bg-[#044ab3]" : "bg-[#1d4f91]")}
          />
          <div className="org-row org-row-line">
            {children.map((child) => (
              <div key={child.id} className="org-slot">
                <Branch node={child} activeId={activeId} path={path} compact={compact} onSelect={onSelect} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function OrgTree({
  root,
  activeId,
  compact = false,
  onSelect,
}: {
  root: OrgNode;
  activeId?: string;
  compact?: boolean;
  onSelect: (id: string) => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const path = activeId ? orgPath(activeId, root) : [];

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
  }, [root, compact]);

  return (
    <div ref={frameRef} className="org-chart w-full overflow-x-clip">
      <div
        ref={treeRef}
        className="mx-auto w-max"
        style={{ zoom }}
        aria-label="Οργανόγραμμα Ναυτικού Νοσοκομείου Κρήτης"
      >
        <Branch node={root} activeId={activeId} path={path} compact={compact} onSelect={onSelect} />
      </div>
    </div>
  );
}
