import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { UserRole } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
const generateToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: "7d",
    });
};
export const registerPatient = async (input) => {
    const normalizedEmail = input.email
        .trim()
        .toLowerCase();
    const normalizedPhone = input.phone.trim();
    const existingUser = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });
    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }
    const existingPhone = await prisma.patientProfile.findUnique({
        where: {
            phone: normalizedPhone,
        },
    });
    if (existingPhone) {
        throw new Error("PHONE_ALREADY_EXISTS");
    }
    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await prisma.user.create({
        data: {
            email: normalizedEmail,
            passwordHash,
            role: UserRole.PATIENT,
            patientProfile: {
                create: {
                    fullName: input.fullName.trim(),
                    phone: normalizedPhone,
                    dateOfBirth: input.dateOfBirth
                        ? new Date(`${input.dateOfBirth}T00:00:00.000Z`)
                        : null,
                },
            },
        },
        include: {
            patientProfile: true,
        },
    });
    const token = generateToken({
        userId: user.id,
        role: user.role,
    });
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            patientProfile: user.patientProfile,
        },
    };
};
export const login = async (input) => {
    const normalizedEmail = input.email
        .trim()
        .toLowerCase();
    const user = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
        include: {
            patientProfile: true,
            doctorProfile: {
                include: {
                    specialty: true,
                },
            },
        },
    });
    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }
    if (!user.isActive) {
        throw new Error("ACCOUNT_DISABLED");
    }
    const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isPasswordValid) {
        throw new Error("INVALID_CREDENTIALS");
    }
    const token = generateToken({
        userId: user.id,
        role: user.role,
    });
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            patientProfile: user.patientProfile,
            doctorProfile: user.doctorProfile,
        },
    };
};
//# sourceMappingURL=auth.service.js.map