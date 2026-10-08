export type UserRole = "patient" | "doctor" | "admin";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export type DepartmentSector =
  | "surgical"
  | "pathology"
  | "laboratory"
  | "dental"
  | "emergency"
  | "outpatient";

export interface User {
  id: string;
  role: UserRole;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  amka: string | null;
  phone: string | null;
  dob: string | null;
  rank_or_status: string | null;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  location_floor: string | null;
  slug: string;
  sector: DepartmentSector;
  phone: string | null;
  visiting_notes: string | null;
  is_bookable: boolean;
  sort_order: number;
  created_at: string;
}

export interface Doctor {
  id: string;
  user_id: string | null;
  department_id: string;
  specialty: string;
  bio: string;
  full_name: string;
  rank_title: string | null;
  is_published: boolean;
  created_at: string;
}

export interface DoctorSchedule {
  id: string;
  doctor_id: string;
  weekday: number;
  start_time: string;
  end_time: string;
  slot_minutes: number;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  department_id: string;
  appointment_date: string;
  status: AppointmentStatus;
  notes: string | null;
  staff_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  published_at: string | null;
  author_id: string | null;
  created_at: string;
}

export interface Guideline {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  updated_at: string;
}

export interface TestResult {
  id: string;
  patient_id: string;
  title: string;
  ordered_at: string;
  released_at: string | null;
  storage_path: string;
  mime_type: string;
  created_at: string;
}

export interface DepartmentWithDoctors extends Department {
  doctors: Doctor[];
}

export interface AppointmentWithRelations extends Appointment {
  doctor: Pick<Doctor, "id" | "full_name" | "specialty"> | null;
  department: Pick<Department, "id" | "name" | "slug"> | null;
}

export interface Database {
  public: {
    Tables: {
      users: { Row: User };
      profiles: { Row: Profile };
      departments: { Row: Department };
      doctors: { Row: Doctor };
      doctor_schedules: { Row: DoctorSchedule };
      appointments: { Row: Appointment };
      announcements: { Row: Announcement };
      guidelines: { Row: Guideline };
      test_results: { Row: TestResult };
    };
    Enums: {
      user_role: UserRole;
      appointment_status: AppointmentStatus;
      department_sector: DepartmentSector;
    };
  };
}
