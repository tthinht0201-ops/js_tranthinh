import { z } from "zod";
import { isValidDateString } from "../../utils/time.js";
const dateTimeSchema = z.string().refine((value) => !Number.isNaN(Date.parse(value)), { message: "Thời gian không hợp lệ" });
const dateStringSchema = z.string().refine(isValidDateString, {
    message: "Ngày phải có định dạng YYYY-MM-DD",
});
export const appointmentIdSchema = z.object({
    id: z.string().uuid("ID lịch hẹn không hợp lệ"),
});
export const createAppointmentSchema = z.object({
    doctorId: z.string().uuid("ID bác sĩ không hợp lệ"),
    startAt: dateTimeSchema,
});
export const patientAppointmentsQuerySchema = z.object({
    scope: z.enum(["upcoming", "past", "all"]).default("upcoming"),
});
export const cancelAppointmentSchema = z.object({
    reason: z.string().trim().max(500).nullable().optional(),
});
export const doctorAppointmentsQuerySchema = z.object({
    date: dateStringSchema.optional(),
});
export const adminAppointmentsQuerySchema = z.object({
    doctorId: z.string().uuid("ID bác sĩ không hợp lệ").optional(),
    date: dateStringSchema.optional(),
    status: z
        .enum([
        "PENDING",
        "CONFIRMED",
        "NEEDS_RESCHEDULE",
        "COMPLETED",
        "CANCELLED",
    ])
        .optional(),
});
export const adminUpdateAppointmentStatusSchema = z.object({
    status: z.enum(["CONFIRMED", "CANCELLED"]),
    cancellationSource: z
        .enum(["DOCTOR", "ADMIN"])
        .optional(),
    reason: z
        .string()
        .trim()
        .max(500)
        .nullable()
        .optional(),
});
export const adminRescheduleAppointmentSchema = z.object({
    startAt: dateTimeSchema,
});
//# sourceMappingURL=appointment.schema.js.map