import { AppointmentStatus } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
export const createReview = async (userId, input) => {
    const appointment = await prisma.appointment.findFirst({
        where: {
            id: input.appointmentId,
            patient: {
                userId,
            },
        },
        include: {
            review: true,
        },
    });
    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }
    if (appointment.status !== AppointmentStatus.COMPLETED) {
        throw new Error("APPOINTMENT_NOT_COMPLETED");
    }
    if (appointment.review) {
        throw new Error("REVIEW_ALREADY_EXISTS");
    }
    return prisma.review.create({
        data: {
            appointmentId: appointment.id,
            rating: input.rating,
            comment: input.comment ?? null,
        },
        include: {
            appointment: {
                select: {
                    doctor: {
                        select: {
                            id: true,
                            fullName: true,
                        },
                    },
                },
            },
        },
    });
};
export const getDoctorReviews = async (doctorId) => {
    const doctor = await prisma.doctorProfile.findFirst({
        where: {
            id: doctorId,
            user: {
                isActive: true,
            },
        },
        select: {
            id: true,
        },
    });
    if (!doctor) {
        throw new Error("DOCTOR_NOT_FOUND");
    }
    const [reviews, aggregate] = await Promise.all([
        prisma.review.findMany({
            where: {
                appointment: {
                    doctorId,
                },
            },
            select: {
                id: true,
                rating: true,
                comment: true,
                createdAt: true,
                appointment: {
                    select: {
                        patient: {
                            select: {
                                fullName: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 50,
        }),
        prisma.review.aggregate({
            where: {
                appointment: {
                    doctorId,
                },
            },
            _avg: {
                rating: true,
            },
            _count: {
                rating: true,
            },
        }),
    ]);
    return {
        average: aggregate._avg.rating ?? 0,
        totalReviews: aggregate._count.rating,
        reviews,
    };
};
//# sourceMappingURL=review.service.js.map