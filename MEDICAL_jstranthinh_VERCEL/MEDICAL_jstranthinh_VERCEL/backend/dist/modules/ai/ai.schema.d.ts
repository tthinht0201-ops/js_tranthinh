import { z } from "zod";
export declare const specialtySuggestionSchema: z.ZodObject<{
    symptoms: z.ZodString;
}, z.core.$strip>;
export type SpecialtySuggestionInput = z.infer<typeof specialtySuggestionSchema>;
//# sourceMappingURL=ai.schema.d.ts.map