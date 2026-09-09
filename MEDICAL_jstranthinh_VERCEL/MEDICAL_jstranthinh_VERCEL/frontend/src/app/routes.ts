import type { UserRole } from "../types/api";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forbidden: "/403",

  patientAppointments: "/patient/appointments",
  patientProfile: "/patient/profile",
  patientAi: "/patient/ai",

  doctorDashboard: "/doctor/dashboard",
  doctorSchedule: "/doctor/schedule",

  adminDashboard: "/admin/dashboard",
  adminAppointments: "/admin/appointments",
  adminDoctors: "/admin/doctors",
  adminSpecialties: "/admin/specialties",
} as const;

export const doctorDetailPath = (doctorId: string) => `/doctors/${doctorId}`;

export const roleHomePath = (role: UserRole) => {
  switch (role) {
    case "DOCTOR":
      return ROUTES.doctorDashboard;
    case "ADMIN":
    case "RECEPTIONIST":
      return ROUTES.adminDashboard;
    case "PATIENT":
    default:
      return ROUTES.home;
  }
};
