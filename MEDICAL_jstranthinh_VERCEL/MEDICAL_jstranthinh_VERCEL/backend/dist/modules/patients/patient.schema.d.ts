import { z } from "zod";
export declare const updatePatientProfileSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodNullable<z.ZodISODate>>;
}, z.core.$strip>;
export type UpdatePatientProfileInput = z.infer<typeof updatePatientProfileSchema>;
//# sourceMappingURL=patient.schema.d.ts.map