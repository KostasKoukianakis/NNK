import type { UserRole } from "@/types/database";

export const PATIENT_PREFIX = "/portal";
export const ADMIN_PREFIX = "/admin";

export function isStaffRole(role: UserRole | null | undefined) {
  return role === "admin" || role === "doctor";
}

export function defaultHomeForRole(role: UserRole | null | undefined) {
  if (role === "admin" || role === "doctor") {
    return ADMIN_PREFIX;
  }

  if (role === "patient") {
    return PATIENT_PREFIX;
  }

  return "/";
}
