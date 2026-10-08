import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import type { Announcement } from "@/types/database";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Ανακοινώσεις",
};

async function listAnnouncements(): Promise<Announcement[]> {
  if (!isSupabaseConfigured()) {
    return [
      {
        id: "seed-1",
        title: "Ωράριο γραμματείας εξωτερικών ιατρείων",
        content:
          "Η γραμματεία λειτουργεί Δευτέρα–Παρασκευή 08:00–14:00. Ραντεβού στα 28210 82628 και 28210 82720.",
        published_at: "2026-09-01T08:00:00.000Z",
        author_id: null,
        created_at: "2026-09-01T08:00:00.000Z",
      },
    ];
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("*")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });

  return data ?? [];
}

export default async function AnnouncementsPage() {
  const announcements = await listAnnouncements();

  return (
    <PageShell>
      <h1 className="text-5xl">Ανακοινώσεις</h1>
      <ul className="mt-10 space-y-6">
        {announcements.map((item) => (
          <li key={item.id} className="rounded-2xl bg-white/30 p-5">
            <p className="text-sm text-[var(--muted)]">
              {item.published_at
                ? new Intl.DateTimeFormat("el-GR", { dateStyle: "long" }).format(
                    new Date(item.published_at),
                  )
                : null}
            </p>
            <h2 className="mt-1 text-3xl">{item.title}</h2>
            <p className="mt-3 max-w-prose">{item.content}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
