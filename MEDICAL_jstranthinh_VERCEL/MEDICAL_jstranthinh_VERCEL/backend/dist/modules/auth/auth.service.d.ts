import { UserRole } from "../../generated/prisma/client.js";
import type { LoginInput, RegisterInput } from "./auth.schema.js";
export declare const registerPatient: (input: RegisterInput) => Promise<{
    token: string;
    user: {
        id: string;
        email: string;
        role: UserRole;
        isActive: boolean;
        patientProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            fullName: string;
            phone: string;
            dateOfBirth: Date | null;
        } | null;
    };
}>;
export declare const login: (input: LoginInput) => Promise<{
    token: string;
    user: {
        id: string;
        email: string;
        role: UserRole;
        isActive: true;
        patientProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            fullName: string;
            phone: string;
            dateOfBirth: Date | null;
        } | null;
        doctorProfile: ({
            specialty: {
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            fullName: string;
            phone: string | null;
            specialtyId: string;
            bio: string | null;
            experienceYears: number;
            avatarUrl: string | null;
        }) | null;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map