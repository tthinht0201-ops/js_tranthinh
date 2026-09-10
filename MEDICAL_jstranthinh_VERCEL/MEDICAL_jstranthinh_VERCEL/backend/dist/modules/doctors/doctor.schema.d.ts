import { z } from "zod";
export declare const doctorIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const doctorQuerySchema: z.ZodObject<{
    specialtyId: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createDoctorSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    fullName: z.ZodString;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    specialtyId: z.ZodString;
    experienceYears: z.ZodDefault<z.ZodNumber>;
    bio: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    avatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const updateDoctorSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodEmail>;
    fullName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    specialtyId: z.ZodOptional<z.ZodString>;
    experienceYears: z.ZodOptional<z.ZodNumber>;
    bio: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    avatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateDoctorInput = z.infer<typeof createDoctorSchema>;
export type UpdateDoctorInput = z.infer<typeof updateDoctorSchema>;
export type DoctorQueryInput = z.infer<typeof doctorQuerySchema>;
//# sourceMappingURL=doctor.schema.d.ts.map