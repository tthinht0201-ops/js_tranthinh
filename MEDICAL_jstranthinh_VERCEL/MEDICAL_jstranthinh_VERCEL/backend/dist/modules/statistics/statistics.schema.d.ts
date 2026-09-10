import { z } from "zod";
export declare const statisticsQuerySchema: z.ZodObject<{
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type StatisticsQueryInput = z.infer<typeof statisticsQuerySchema>;
//# sourceMappingURL=statistics.schema.d.ts.map