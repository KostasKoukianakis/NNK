import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UserRound } from "lucide-react";
import { OrgTree } from "@/components/organization/org-tree";
import { StringsNet } from "@/components/visual/strings-net";
import { buildOrganogram, findOrgNode, listOrgIds } from "@/lib/content/organogram";

interface OrgProfilePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return listOrgIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: OrgProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const node = findOrgNode(id);
  return {
    title: node?.name ? `${node.title} · ${node.name}` : (node?.title ?? "Οργανόγραμμα"),
  };
}

export default async function OrgProfilePage({ params }: OrgProfilePageProps) {
  const { id } = await params;
  const node = findOrgNode(id);
  if (!node) notFound();

  const tree = buildOrganogram();

  return (
    <div className="relative overflow-x-clip">
      <StringsNet />
      <div className="relative z-10 mx-auto w-full max-w-[92rem] px-5 pb-16 pt-36 sm:px-8 sm:pt-40 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/55">
          <Link href="/organization" className="hover:text-white">
            Οργανόγραμμα
          </Link>
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl">{node.title}</h1>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(16rem,28rem)_minmax(0,1fr)]">
          <aside className="rounded-2xl bg-[#f3f6fb] px-3 py-6 sm:px-4">
            <p className="mb-4 px-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[#1d4f91]">
              Διάλεξε θέση
            </p>
            <OrgTree root={tree} activeId={node.id} compact />
          </aside>

          <article className="rounded-2xl bg-white px-6 py-8 text-[#044ab3] sm:px-10 sm:py-10">
            <div className="grid gap-8 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:items-end">
              {node.image ? (
                <img
                  src={node.image}
                  alt={node.imageAlt || node.name || node.title}
                  className="aspect-[4/5] w-full max-w-[10.5rem] object-cover object-top"
                />
              ) : (
                <div className="flex aspect-[4/5] w-full max-w-[10.5rem] items-center justify-center bg-[#e7eef6] text-[#1d4f91]/45">
                  <UserRound className="size-14" strokeWidth={1.15} aria-hidden="true" />
                </div>
              )}
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em]">{node.title}</p>
                {node.rank ? <p className="mt-2 text-sm text-[#044ab3]/80">{node.rank}</p> : null}
                {node.name ? (
                  <p className="mt-1 text-2xl font-medium leading-tight">{node.name}</p>
                ) : (
                  <p className="mt-2 max-w-sm text-sm leading-snug text-[#044ab3]/70">
                    Το ονοματεπώνυμο συμπληρώνεται όταν οριστεί το στέλεχος.
                  </p>
                )}
              </div>
            </div>
            <p className="mt-8 text-[clamp(1.35rem,2.2vw,2rem)] font-medium leading-snug">{node.bio}</p>
          </article>
        </div>
      </div>
    </div>
  );
}
