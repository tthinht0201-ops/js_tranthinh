import { z } from "zod";
export const doctorReviewsParamsSchema = z.object({
    doctorId: z.string().uuid("ID bác sĩ không hợp lệ"),
});
export const createReviewSchema = z.object({
    appointmentId: z.string().uuid("ID lịch hẹn không hợp lệ"),
    rating: z.number().int().min(1).max(5),
    comment: z.string().trim().max(2000).nullable().optional(),
});
//# sourceMappingURL=review.schema.js.map