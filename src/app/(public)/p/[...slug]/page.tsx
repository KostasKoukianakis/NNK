import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageShell } from "@/components/ui/glass";
import { findPage, flattenMenu } from "@/lib/content/site-map";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export function generateStaticParams() {
  return flattenMenu()
    .filter((page) => page.url.startsWith("/p/"))
    .map((page) => ({ slug: page.path }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  return { title: page?.title ?? "Σελίδα" };
}

export default async function MappedPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findPage(slug);

  if (!page) {
    notFound();
  }

  if (page.url !== `/p/${slug.join("/")}`) {
    redirect(page.url);
  }

  const crumbs = page.path.slice(0, -1).map((_, index) => {
    const path = page.path.slice(0, index + 1);
    const ancestor = findPage(path);
    return ancestor ? { title: ancestor.title, url: ancestor.url } : null;
  });

  return (
    <PageShell wide>
      <nav aria-label="Διαδρομή" className="text-sm text-[var(--muted)]">
        <ol className="flex flex-wrap gap-x-2 gap-y-1">
          <li>
            <Link className="underline-offset-2 hover:underline" href="/">
              Αρχική
            </Link>
          </li>
          {crumbs.map((crumb) =>
            crumb ? (
              <li key={crumb.url}>
                <span aria-hidden="true"> / </span>
                <Link className="underline-offset-2 hover:underline" href={crumb.url}>
                  {crumb.title}
                </Link>
              </li>
            ) : null,
          )}
        </ol>
      </nav>
      <h1 className="mt-4 text-5xl">{page.title}</h1>
      <div className="mt-6 max-w-prose space-y-4 text-lg">
        {page.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {page.children.length > 0 ? (
        <ul className="mt-10 grid gap-3 lg:grid-cols-2">
          {page.children.map((child) => (
            <li key={child.path.join("/")}>
              <Link
                href={child.url}
                className="block rounded-2xl bg-white/30 px-4 py-4 text-xl font-semibold hover:bg-white/45"
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </PageShell>
  );
}
