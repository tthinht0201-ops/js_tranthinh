import { z } from "zod";
export declare const appointmentIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const createAppointmentSchema: z.ZodObject<{
    doctorId: z.ZodString;
    startAt: z.ZodString;
}, z.core.$strip>;
export declare const patientAppointmentsQuerySchema: z.ZodObject<{
    scope: z.ZodDefault<z.ZodEnum<{
        upcoming: "upcoming";
        past: "past";
        all: "all";
    }>>;
}, z.core.$strip>;
export declare const cancelAppointmentSchema: z.ZodObject<{
    reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const doctorAppointmentsQuerySchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const adminAppointmentsQuerySchema: z.ZodObject<{
    doctorId: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        CONFIRMED: "CONFIRMED";
        NEEDS_RESCHEDULE: "NEEDS_RESCHEDULE";
        COMPLETED: "COMPLETED";
        CANCELLED: "CANCELLED";
    }>>;
}, z.core.$strip>;
export declare const adminUpdateAppointmentStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        CONFIRMED: "CONFIRMED";
        CANCELLED: "CANCELLED";
    }>;
    cancellationSource: z.ZodOptional<z.ZodEnum<{
        DOCTOR: "DOCTOR";
        ADMIN: "ADMIN";
    }>>;
    reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const adminRescheduleAppointmentSchema: z.ZodObject<{
    startAt: z.ZodString;
}, z.core.$strip>;
export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type PatientAppointmentsQueryInput = z.infer<typeof patientAppointmentsQuerySchema>;
export type CancelAppointmentInput = z.infer<typeof cancelAppointmentSchema>;
export type DoctorAppointmentsQueryInput = z.infer<typeof doctorAppointmentsQuerySchema>;
export type AdminAppointmentsQueryInput = z.infer<typeof adminAppointmentsQuerySchema>;
export type AdminUpdateAppointmentStatusInput = z.infer<typeof adminUpdateAppointmentStatusSchema>;
export type AdminRescheduleAppointmentInput = z.infer<typeof adminRescheduleAppointmentSchema>;
//# sourceMappingURL=appointment.schema.d.ts.map