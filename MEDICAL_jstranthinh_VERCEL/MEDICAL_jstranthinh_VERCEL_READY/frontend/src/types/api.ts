export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN" | "RECEPTIONIST";

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "NEEDS_RESCHEDULE"
  | "COMPLETED"
  | "CANCELLED";

export type CancellationSource = "PATIENT" | "DOCTOR" | "ADMIN";

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface Specialty {
  id: string;
  name: string;
  description: string | null;
  isActive?: boolean;
  _count?: { doctors: number };
}

export interface Doctor {
  id: string;
  fullName: string;
  phone?: string | null;
  experienceYears: number;
  bio: string | null;
  avatarUrl: string | null;
  specialty: Pick<Specialty, "id" | "name" | "description">;
  rating?: {
    average: number;
    totalReviews: number;
  };
}

export interface PatientProfile {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  dateOfBirth: string | null;
}

export interface CurrentUser {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  patientProfile: PatientProfile | null;
  doctorProfile: (Doctor & { userId?: string }) | null;
}

export interface AvailableSlot {
  startAt: string;
  endAt: string;
  startTime: string;
  endTime: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  startAt: string;
  endAt: string;
  status: AppointmentStatus;

  rescheduleReason: string | null;
  reschedulePreviousStatus: AppointmentStatus | null;
  relatedBlockedTimeId: string | null;

  cancellationSource: CancellationSource | null;
  cancellationReason: string | null;
  cancelledAt: string | null;
  completedAt: string | null;

  patient: Pick<PatientProfile, "id" | "fullName" | "phone" | "dateOfBirth">;
  doctor: {
    id: string;
    fullName: string;
    phone: string | null;
    avatarUrl: string | null;
    specialty: Pick<Specialty, "id" | "name">;
  };
  review: Review | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface DoctorSchedule {
  id: string;
  doctorId: string;
  dayOfWeek: DayOfWeek;
  startMinute: number;
  endMinute: number;
  slotMinutes: number;
  isActive: boolean;
}

export interface DoctorDateSchedule {
  id: string;
  doctorId: string;
  workDate: string;
  startMinute: number;
  endMinute: number;
  slotMinutes: number;
  isActive: boolean;
  note: string | null;
}

export interface BlockedTime {
  id: string;
  doctorId: string;
  startAt: string;
  endAt: string;
  reason: string | null;
}
