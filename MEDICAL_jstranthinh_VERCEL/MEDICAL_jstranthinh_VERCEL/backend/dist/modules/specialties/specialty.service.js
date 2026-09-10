import { prisma } from "../../lib/prisma.js";
export const getAllSpecialties = async () => {
    return prisma.specialty.findMany({
        where: {
            isActive: true,
        },
        orderBy: {
            name: "asc",
        },
        select: {
            id: true,
            name: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    doctors: true,
                },
            },
        },
    });
};
export const getSpecialtyById = async (id) => {
    const specialty = await prisma.specialty.findFirst({
        where: {
            id,
            isActive: true,
        },
        select: {
            id: true,
            name: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    doctors: true,
                },
            },
        },
    });
    if (!specialty) {
        throw new Error("SPECIALTY_NOT_FOUND");
    }
    return specialty;
};
export const createSpecialty = async (input) => {
    const normalizedName = input.name.trim();
    const existingSpecialty = await prisma.specialty.findFirst({
        where: {
            name: {
                equals: normalizedName,
                mode: "insensitive",
            },
        },
    });
    if (existingSpecialty) {
        throw new Error("SPECIALTY_ALREADY_EXISTS");
    }
    return prisma.specialty.create({
        data: {
            name: normalizedName,
            description: input.description === undefined
                ? null
                : input.description,
        },
    });
};
export const updateSpecialty = async (id, input) => {
    const specialty = await prisma.specialty.findUnique({
        where: {
            id,
        },
    });
    if (!specialty) {
        throw new Error("SPECIALTY_NOT_FOUND");
    }
    if (input.name !== undefined &&
        input.name.trim().toLowerCase() !==
            specialty.name.toLowerCase()) {
        const existingName = await prisma.specialty.findFirst({
            where: {
                id: {
                    not: id,
                },
                name: {
                    equals: input.name.trim(),
                    mode: "insensitive",
                },
            },
        });
        if (existingName) {
            throw new Error("SPECIALTY_ALREADY_EXISTS");
        }
    }
    return prisma.specialty.update({
        where: {
            id,
        },
        data: {
            ...(input.name !== undefined && {
                name: input.name.trim(),
            }),
            ...(input.description !== undefined && {
                description: input.description,
            }),
            ...(input.isActive !== undefined && {
                isActive: input.isActive,
            }),
        },
    });
};
export const deactivateSpecialty = async (id) => {
    const specialty = await prisma.specialty.findUnique({
        where: {
            id,
        },
        include: {
            _count: {
                select: {
                    doctors: true,
                },
            },
        },
    });
    if (!specialty) {
        throw new Error("SPECIALTY_NOT_FOUND");
    }
    if (!specialty.isActive) {
        throw new Error("SPECIALTY_ALREADY_INACTIVE");
    }
    return prisma.specialty.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
    });
};
//# sourceMappingURL=specialty.service.js.map