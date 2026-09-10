import { UserRole } from "../../generated/prisma/client.js";
import type { CreateDoctorInput, DoctorQueryInput, UpdateDoctorInput } from "./doctor.schema.js";
export declare const getDoctors: (query: DoctorQueryInput) => Promise<{
    id: string;
    createdAt: Date;
    specialty: {
        id: string;
        name: string;
        description: string | null;
    };
    fullName: string;
    bio: string | null;
    experienceYears: number;
    avatarUrl: string | null;
}[]>;
export declare const getDoctorById: (id: string) => Promise<{
    rating: {
        average: number;
        totalReviews: number;
    };
    id: string;
    createdAt: Date;
    specialty: {
        id: string;
        name: string;
        description: string | null;
    };
    fullName: string;
    bio: string | null;
    experienceYears: number;
    avatarUrl: string | null;
}>;
export declare const createDoctor: (input: CreateDoctorInput) => Promise<{
    id: string;
    email: string;
    role: UserRole;
    isActive: boolean;
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
}>;
export declare const updateDoctor: (id: string, input: UpdateDoctorInput) => Promise<{
    user: {
        id: string;
        email: string;
        role: UserRole;
        isActive: boolean;
    };
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
}>;
export declare const deactivateDoctor: (id: string) => Promise<{
    id: string;
    isActive: boolean;
}>;
export declare const getDoctorsForStaff: () => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: string;
        email: string;
        isActive: boolean;
    };
    specialty: {
        id: string;
        isActive: boolean;
        name: string;
        description: string | null;
    };
    fullName: string;
    phone: string | null;
    bio: string | null;
    experienceYears: number;
    avatarUrl: string | null;
}[]>;
//# sourceMappingURL=doctor.service.d.ts.map