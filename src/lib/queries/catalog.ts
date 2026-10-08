import {
  getFallbackDepartmentBySlug,
  getFallbackDepartments,
  getFallbackDoctors,
} from "@/lib/content/departments";
import { isSupabaseConfigured } from "@/lib/utils";
import type { Department, DepartmentWithDoctors, Doctor } from "@/types/database";
import { createClient } from "@/utils/supabase/server";

export async function listDepartments(): Promise<Department[]> {
  if (!isSupabaseConfigured()) {
    return getFallbackDepartments();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return getFallbackDepartments();
  }

  return data;
}

export async function getDepartmentBySlug(
  slug: string,
): Promise<DepartmentWithDoctors | null> {
  if (!isSupabaseConfigured()) {
    return getFallbackDepartmentBySlug(slug);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("departments")
    .select("*, doctors(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return getFallbackDepartmentBySlug(slug);
  }

  return data as DepartmentWithDoctors;
}

export async function listPublishedDoctors(): Promise<Doctor[]> {
  if (!isSupabaseConfigured()) {
    return getFallbackDoctors();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("is_published", true)
    .order("full_name", { ascending: true });

  if (error || !data) {
    return getFallbackDoctors();
  }

  return data;
}
