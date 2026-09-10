import type { CreateSpecialtyInput, UpdateSpecialtyInput } from "./specialty.schema.js";
export declare const getAllSpecialties: () => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: {
        doctors: number;
    };
    name: string;
    description: string | null;
}[]>;
export declare const getSpecialtyById: (id: string) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: {
        doctors: number;
    };
    name: string;
    description: string | null;
}>;
export declare const createSpecialty: (input: CreateSpecialtyInput) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string | null;
}>;
export declare const updateSpecialty: (id: string, input: UpdateSpecialtyInput) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string | null;
}>;
export declare const deactivateSpecialty: (id: string) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string | null;
}>;
//# sourceMappingURL=specialty.service.d.ts.map