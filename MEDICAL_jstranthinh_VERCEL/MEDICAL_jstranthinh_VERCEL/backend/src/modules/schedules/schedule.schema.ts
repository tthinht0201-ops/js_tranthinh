import { z } from "zod";

import { isValidDateString } from "../../utils/time.js";

const dayOfWeekSchema = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

const dateStringSchema = z.string().refine(isValidDateString, {
  message: "Ngày phải có định dạng YYYY-MM-DD",
});

const dateTimeSchema = z.string().refine(
  (value) => !Number.isNaN(Date.parse(value)),
  { message: "Thời gian không hợp lệ" },
);

const validateScheduleRange = (
  value: {
    startMinute: number;
    endMinute: number;
    slotMinutes: number;
  },
  ctx: z.RefinementCtx,
) => {
  if (value.endMinute <= value.startMinute) {
    ctx.addIssue({
      code: "custom",
      path: ["endMinute"],
      message: "Giờ kết thúc phải sau giờ bắt đầu",
    });
  }

  if (value.endMinute - value.startMinute < value.slotMinutes) {
    ctx.addIssue({
      code: "custom",
      path: ["slotMinutes"],
      message: "Khung làm việc phải đủ ít nhất một lượt khám",
    });
  }
};

export const createScheduleSchema = z
  .object({
    dayOfWeek: dayOfWeekSchema,
    startMinute: z.number().int().min(0).max(1439),
    endMinute: z.number().int().min(1).max(1440),
    slotMinutes: z.number().int().min(10).max(120).default(30),
  })
  .superRefine(validateScheduleRange);

export const updateScheduleSchema = z
  .object({
    dayOfWeek: dayOfWeekSchema.optional(),
    startMinute: z.number().int().min(0).max(1439).optional(),
    endMinute: z.number().int().min(1).max(1440).optional(),
    slotMinutes: z.number().int().min(10).max(120).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Cần ít nhất một trường để cập nhật",
  });

export const scheduleIdSchema = z.object({
  id: z.string().uuid("ID lịch làm việc không hợp lệ"),
});

export const createDateScheduleSchema = z
  .object({
    date: dateStringSchema,
    startMinute: z.number().int().min(0).max(1439),
    endMinute: z.number().int().min(1).max(1440),
    slotMinutes: z.number().int().min(10).max(120).default(30),
    note: z.string().trim().max(255).nullable().optional(),
  })
  .superRefine(validateScheduleRange);

export const updateDateScheduleSchema = z
  .object({
    date: dateStringSchema.optional(),
    startMinute: z.number().int().min(0).max(1439).optional(),
    endMinute: z.number().int().min(1).max(1440).optional(),
    slotMinutes: z.number().int().min(10).max(120).optional(),
    isActive: z.boolean().optional(),
    note: z.string().trim().max(255).nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Cần ít nhất một trường để cập nhật",
  });

export const dateScheduleIdSchema = z.object({
  id: z.string().uuid("ID lịch theo ngày không hợp lệ"),
});

export const availableSlotsParamsSchema = z.object({
  doctorId: z.string().uuid("ID bác sĩ không hợp lệ"),
});

export const availableSlotsQuerySchema = z.object({
  date: dateStringSchema,
});

export const createBlockedTimeSchema = z
  .object({
    startAt: dateTimeSchema,
    endAt: dateTimeSchema,
    reason: z.string().trim().max(255).nullable().optional(),
  })
  .refine((value) => new Date(value.endAt) > new Date(value.startAt), {
    path: ["endAt"],
    message: "Thời gian kết thúc phải sau thời gian bắt đầu",
  });

export const updateBlockedTimeSchema = z
  .object({
    startAt: dateTimeSchema.optional(),
    endAt: dateTimeSchema.optional(),
    reason: z.string().trim().max(255).nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Cần ít nhất một trường để cập nhật",
  });

export const blockedTimeIdSchema = z.object({
  id: z.string().uuid("ID thời gian nghỉ không hợp lệ"),
});

export const blockedTimeQuerySchema = z.object({
  from: dateTimeSchema.optional(),
  to: dateTimeSchema.optional(),
});

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
export type UpdateScheduleInput = z.infer<typeof updateScheduleSchema>;
export type CreateDateScheduleInput = z.infer<typeof createDateScheduleSchema>;
export type UpdateDateScheduleInput = z.infer<typeof updateDateScheduleSchema>;
export type CreateBlockedTimeInput = z.infer<typeof createBlockedTimeSchema>;
export type UpdateBlockedTimeInput = z.infer<typeof updateBlockedTimeSchema>;
export type BlockedTimeQueryInput = z.infer<typeof blockedTimeQuerySchema>;
