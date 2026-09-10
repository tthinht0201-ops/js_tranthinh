import { z } from "zod";
export declare const createScheduleSchema: z.ZodObject<{
    dayOfWeek: z.ZodEnum<{
        MONDAY: "MONDAY";
        TUESDAY: "TUESDAY";
        WEDNESDAY: "WEDNESDAY";
        THURSDAY: "THURSDAY";
        FRIDAY: "FRIDAY";
        SATURDAY: "SATURDAY";
        SUNDAY: "SUNDAY";
    }>;
    startMinute: z.ZodNumber;
    endMinute: z.ZodNumber;
    slotMinutes: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateScheduleSchema: z.ZodObject<{
    dayOfWeek: z.ZodOptional<z.ZodEnum<{
        MONDAY: "MONDAY";
        TUESDAY: "TUESDAY";
        WEDNESDAY: "WEDNESDAY";
        THURSDAY: "THURSDAY";
        FRIDAY: "FRIDAY";
        SATURDAY: "SATURDAY";
        SUNDAY: "SUNDAY";
    }>>;
    startMinute: z.ZodOptional<z.ZodNumber>;
    endMinute: z.ZodOptional<z.ZodNumber>;
    slotMinutes: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const scheduleIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const createDateScheduleSchema: z.ZodObject<{
    date: z.ZodString;
    startMinute: z.ZodNumber;
    endMinute: z.ZodNumber;
    slotMinutes: z.ZodDefault<z.ZodNumber>;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const updateDateScheduleSchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
    startMinute: z.ZodOptional<z.ZodNumber>;
    endMinute: z.ZodOptional<z.ZodNumber>;
    slotMinutes: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const dateScheduleIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const availableSlotsParamsSchema: z.ZodObject<{
    doctorId: z.ZodString;
}, z.core.$strip>;
export declare const availableSlotsQuerySchema: z.ZodObject<{
    date: z.ZodString;
}, z.core.$strip>;
export declare const createBlockedTimeSchema: z.ZodObject<{
    startAt: z.ZodString;
    endAt: z.ZodString;
    reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const updateBlockedTimeSchema: z.ZodObject<{
    startAt: z.ZodOptional<z.ZodString>;
    endAt: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const blockedTimeIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const blockedTimeQuerySchema: z.ZodObject<{
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
export type UpdateScheduleInput = z.infer<typeof updateScheduleSchema>;
export type CreateDateScheduleInput = z.infer<typeof createDateScheduleSchema>;
export type UpdateDateScheduleInput = z.infer<typeof updateDateScheduleSchema>;
export type CreateBlockedTimeInput = z.infer<typeof createBlockedTimeSchema>;
export type UpdateBlockedTimeInput = z.infer<typeof updateBlockedTimeSchema>;
export type BlockedTimeQueryInput = z.infer<typeof blockedTimeQuerySchema>;
//# sourceMappingURL=schedule.schema.d.ts.map