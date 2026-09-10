import { z } from "zod";
export declare const doctorReviewsParamsSchema: z.ZodObject<{
    doctorId: z.ZodString;
}, z.core.$strip>;
export declare const createReviewSchema: z.ZodObject<{
    appointmentId: z.ZodString;
    rating: z.ZodNumber;
    comment: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
//# sourceMappingURL=review.schema.d.ts.map