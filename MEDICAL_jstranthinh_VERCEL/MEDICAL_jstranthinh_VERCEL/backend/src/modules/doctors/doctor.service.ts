import bcrypt from "bcryptjs";

import { UserRole } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

import type {
  CreateDoctorInput,
  DoctorQueryInput,
  UpdateDoctorInput,
} from "./doctor.schema.js";

export const getDoctors = async (
  query: DoctorQueryInput,
) => {
  return prisma.doctorProfile.findMany({
    where: {
      user: {
        isActive: true,
      },

      specialty: {
        isActive: true,
      },

      ...(query.specialtyId !== undefined && {
        specialtyId: query.specialtyId,
      }),

      ...(query.q !== undefined &&
        query.q.length > 0 && {
          fullName: {
            contains: query.q,
            mode: "insensitive",
          },
        }),
    },

    select: {
      id: true,
      fullName: true,
      experienceYears: true,
      bio: true,
      avatarUrl: true,
      createdAt: true,

      specialty: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },

    orderBy: {
      fullName: "asc",
    },
  });
};

export const getDoctorById = async (
  id: string,
) => {
  const doctor = await prisma.doctorProfile.findFirst({
    where: {
      id,

      user: {
        isActive: true,
      },

      specialty: {
        isActive: true,
      },
    },

    select: {
      id: true,
      fullName: true,
      experienceYears: true,
      bio: true,
      avatarUrl: true,
      createdAt: true,

      specialty: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
  });

  if (!doctor) {
    throw new Error("DOCTOR_NOT_FOUND");
  }

  const rating = await prisma.review.aggregate({
    where: {
      appointment: {
        doctorId: id,
      },
    },

    _avg: {
      rating: true,
    },

    _count: {
      rating: true,
    },
  });

  return {
    ...doctor,

    rating: {
      average: rating._avg.rating ?? 0,
      totalReviews: rating._count.rating,
    },
  };
};

export const createDoctor = async (
  input: CreateDoctorInput,
) => {
  const normalizedEmail =
    input.email.trim().toLowerCase();

  const normalizedPhone =
    input.phone?.trim() || null;

  const specialty =
    await prisma.specialty.findFirst({
      where: {
        id: input.specialtyId,
        isActive: true,
      },
    });

  if (!specialty) {
    throw new Error("SPECIALTY_NOT_FOUND");
  }

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  if (normalizedPhone) {
    const existingPhone =
      await prisma.doctorProfile.findUnique({
        where: {
          phone: normalizedPhone,
        },
      });

    if (existingPhone) {
      throw new Error("PHONE_ALREADY_EXISTS");
    }
  }

  const passwordHash = await bcrypt.hash(
    input.password,
    12,
  );

  const createdUser =
    await prisma.$transaction(async (tx) => {
      return tx.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          role: UserRole.DOCTOR,
          isActive: true,

          doctorProfile: {
            create: {
              fullName: input.fullName.trim(),
              phone: normalizedPhone,

              experienceYears:
                input.experienceYears,

              bio:
                input.bio === undefined
                  ? null
                  : input.bio,

              avatarUrl:
                input.avatarUrl === undefined
                  ? null
                  : input.avatarUrl,

              specialty: {
                connect: {
                  id: input.specialtyId,
                },
              },
            },
          },
        },

        include: {
          doctorProfile: {
            include: {
              specialty: true,
            },
          },
        },
      });
    });

  return {
    id: createdUser.id,
    email: createdUser.email,
    role: createdUser.role,
    isActive: createdUser.isActive,
    doctorProfile: createdUser.doctorProfile,
  };
};

export const updateDoctor = async (
  id: string,
  input: UpdateDoctorInput,
) => {
  const doctor =
    await prisma.doctorProfile.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
      },
    });

  if (!doctor) {
    throw new Error("DOCTOR_NOT_FOUND");
  }

  let normalizedEmail: string | undefined;

  if (input.email !== undefined) {
    normalizedEmail =
      input.email.trim().toLowerCase();

    if (
      normalizedEmail !== doctor.user.email
    ) {
      const existingEmail =
        await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
        });

      if (existingEmail) {
        throw new Error(
          "EMAIL_ALREADY_EXISTS",
        );
      }
    }
  }

  let normalizedPhone:
    | string
    | null
    | undefined;

  if (input.phone !== undefined) {
    normalizedPhone =
      input.phone?.trim() || null;

    if (
      normalizedPhone &&
      normalizedPhone !== doctor.phone
    ) {
      const existingPhone =
        await prisma.doctorProfile.findUnique({
          where: {
            phone: normalizedPhone,
          },
        });

      if (existingPhone) {
        throw new Error(
          "PHONE_ALREADY_EXISTS",
        );
      }
    }
  }

  if (input.specialtyId !== undefined) {
    const specialty =
      await prisma.specialty.findFirst({
        where: {
          id: input.specialtyId,
          isActive: true,
        },
      });

    if (!specialty) {
      throw new Error("SPECIALTY_NOT_FOUND");
    }
  }

  return prisma.$transaction(
    async (tx) => {
      await tx.user.update({
        where: {
          id: doctor.userId,
        },

        data: {
          ...(normalizedEmail !==
            undefined && {
            email: normalizedEmail,
          }),

          ...(input.isActive !==
            undefined && {
            isActive: input.isActive,
          }),
        },
      });

      return tx.doctorProfile.update({
        where: {
          id,
        },

        data: {
          ...(input.fullName !==
            undefined && {
            fullName: input.fullName.trim(),
          }),

          ...(normalizedPhone !==
            undefined && {
            phone: normalizedPhone,
          }),

          ...(input.experienceYears !==
            undefined && {
            experienceYears:
              input.experienceYears,
          }),

          ...(input.bio !== undefined && {
            bio: input.bio,
          }),

          ...(input.avatarUrl !==
            undefined && {
            avatarUrl: input.avatarUrl,
          }),

          ...(input.specialtyId !==
            undefined && {
            specialty: {
              connect: {
                id: input.specialtyId,
              },
            },
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

          specialty: true,
        },
      });
    },
  );
};

export const deactivateDoctor = async (
  id: string,
) => {
  const doctor =
    await prisma.doctorProfile.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
      },
    });

  if (!doctor) {
    throw new Error("DOCTOR_NOT_FOUND");
  }

  if (!doctor.user.isActive) {
    throw new Error(
      "DOCTOR_ALREADY_INACTIVE",
    );
  }

  await prisma.user.update({
    where: {
      id: doctor.userId,
    },

    data: {
      isActive: false,
    },
  });

  return {
    id: doctor.id,
    isActive: false,
  };
};
export const getDoctorsForStaff = async () => {
  return prisma.doctorProfile.findMany({
    select: {
      id: true,
      fullName: true,
      phone: true,
      experienceYears: true,
      bio: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          email: true,
          isActive: true,
        },
      },
      specialty: {
        select: {
          id: true,
          name: true,
          description: true,
          isActive: true,
        },
      },
    },
    orderBy: {
      fullName: "asc",
    },
  });
};
