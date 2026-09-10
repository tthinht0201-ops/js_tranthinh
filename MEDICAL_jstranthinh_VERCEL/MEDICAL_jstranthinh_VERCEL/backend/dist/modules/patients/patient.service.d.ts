import type { UpdatePatientProfileInput } from "./patient.schema.js";
export declare const getPatientProfile: (userId: string) => Promise<{
    user: {
        id: string;
        email: string;
        role: import("../../generated/prisma/enums.js").UserRole;
        isActive: boolean;
        createdAt: Date;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    fullName: string;
    phone: string;
    dateOfBirth: Date | null;
}>;
export declare const updatePatientProfile: (userId: string, input: UpdatePatientProfileInput) => Promise<{
    user: {
        id: string;
        email: string;
        role: import("../../generated/prisma/enums.js").UserRole;
        isActive: boolean;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    fullName: string;
    phone: string;
    dateOfBirth: Date | null;
}>;
//# sourceMappingURL=patient.service.d.ts.map