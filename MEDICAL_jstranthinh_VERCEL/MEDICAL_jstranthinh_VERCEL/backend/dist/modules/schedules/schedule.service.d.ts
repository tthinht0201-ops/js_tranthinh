import { type DayOfWeek } from "../../generated/prisma/client.js";
import type { BlockedTimeQueryInput, CreateBlockedTimeInput, CreateDateScheduleInput, CreateScheduleInput, UpdateBlockedTimeInput, UpdateDateScheduleInput, UpdateScheduleInput } from "./schedule.schema.js";
export declare const getMySchedules: (userId: string) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    doctorId: string;
    dayOfWeek: DayOfWeek;
    startMinute: number;
    endMinute: number;
    slotMinutes: number;
}[]>;
export declare const createMySchedule: (userId: string, input: CreateScheduleInput) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    doctorId: string;
    dayOfWeek: DayOfWeek;
    startMinute: number;
    endMinute: number;
    slotMinutes: number;
}>;
export declare const updateMySchedule: (userId: string, scheduleId: string, input: UpdateScheduleInput) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    doctorId: string;
    dayOfWeek: DayOfWeek;
    startMinute: number;
    endMinute: number;
    slotMinutes: number;
}>;
export declare const deleteMySchedule: (userId: string, scheduleId: string) => Promise<void>;
export declare const getMyDateSchedules: (userId: string) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    doctorId: string;
    startMinute: number;
    endMinute: number;
    slotMinutes: number;
    workDate: Date;
    note: string | null;
}[]>;
export declare const createMyDateSchedule: (userId: string, input: CreateDateScheduleInput) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    doctorId: string;
    startMinute: number;
    endMinute: number;
    slotMinutes: number;
    workDate: Date;
    note: string | null;
}>;
export declare const updateMyDateSchedule: (userId: string, scheduleId: string, input: UpdateDateScheduleInput) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    doctorId: string;
    startMinute: number;
    endMinute: number;
    slotMinutes: number;
    workDate: Date;
    note: string | null;
}>;
export declare const deleteMyDateSchedule: (userId: string, scheduleId: string) => Promise<void>;
export declare const getMyBlockedTimes: (userId: string, query: BlockedTimeQueryInput) => Promise<{
    id: string;
    createdAt: Date;
    startAt: Date;
    doctorId: string;
    reason: string | null;
    endAt: Date;
}[]>;
export declare const createMyBlockedTime: (userId: string, input: CreateBlockedTimeInput) => Promise<{
    affectedAppointmentsCount: number;
    id: string;
    createdAt: Date;
    startAt: Date;
    doctorId: string;
    reason: string | null;
    endAt: Date;
}>;
export declare const updateMyBlockedTime: (userId: string, blockedTimeId: string, input: UpdateBlockedTimeInput) => Promise<{
    affectedAppointmentsCount: number;
    id: string;
    createdAt: Date;
    startAt: Date;
    doctorId: string;
    reason: string | null;
    endAt: Date;
}>;
export declare const deleteMyBlockedTime: (userId: string, blockedTimeId: string) => Promise<{
    restoredAppointmentsCount: number;
}>;
export declare const getAvailableSlots: (doctorId: string, date: string) => Promise<{
    doctorId: string;
    date: string;
    dayOfWeek: DayOfWeek;
    scheduleSource: string;
    slots: {
        startAt: string;
        endAt: string;
        startTime: string;
        endTime: string;
    }[];
}>;
//# sourceMappingURL=schedule.service.d.ts.map