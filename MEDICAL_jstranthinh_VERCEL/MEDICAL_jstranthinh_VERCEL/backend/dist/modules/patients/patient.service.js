import { prisma } from "../../lib/prisma.js";
export const getPatientProfile = async (userId) => {
    const patient = await prisma.patientProfile.findUnique({
        where: {
            userId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    role: true,
                    isActive: true,
                    createdAt: true,
                },
            },
        },
    });
    if (!patient) {
        throw new Error("PATIENT_NOT_FOUND");
    }
    return patient;
};
export const updatePatientProfile = async (userId, input) => {
    const existingPatient = await prisma.patientProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!existingPatient) {
        throw new Error("PATIENT_NOT_FOUND");
    }
    if (input.phone &&
        input.phone !== existingPatient.phone) {
        const phoneOwner = await prisma.patientProfile.findUnique({
            where: {
                phone: input.phone,
            },
        });
        if (phoneOwner) {
            throw new Error("PHONE_ALREADY_EXISTS");
        }
    }
    return prisma.patientProfile.update({
        where: {
            userId,
        },
        data: {
            ...(input.fullName !== undefined && {
                fullName: input.fullName.trim(),
            }),
            ...(input.phone !== undefined && {
                phone: input.phone.trim(),
            }),
            ...(input.dateOfBirth !== undefined && {
                dateOfBirth: input.dateOfBirth === null
                    ? null
                    : new Date(`${input.dateOfBirth}T00:00:00.000Z`),
            }),
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    role: true,
                    isActive: true,
                },
            },
        },
    });
};
//# sourceMappingURL=patient.service.js.map