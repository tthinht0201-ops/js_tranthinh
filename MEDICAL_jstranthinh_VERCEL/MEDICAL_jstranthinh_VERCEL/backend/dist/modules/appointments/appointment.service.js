import { AppointmentStatus, CancellationSource, } from "../../generated/prisma/client.js";
import { env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { getVietnamDayOfWeek, getVietnamMinuteOfDay, parseVietnamDateEnd, parseVietnamDateStart, toVietnamDateString, } from "../../utils/time.js";
const appointmentInclude = {
    patient: {
        select: {
            id: true,
            fullName: true,
            phone: true,
            dateOfBirth: true,
        },
    },
    doctor: {
        select: {
            id: true,
            fullName: true,
            phone: true,
            avatarUrl: true,
            specialty: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    },
    review: true,
};
const findValidSchedule = async (tx, doctorId, startAt) => {
    const date = toVietnamDateString(startAt);
    const workDate = new Date(`${date}T00:00:00.000Z`);
    const dayOfWeek = getVietnamDayOfWeek(startAt);
    const startMinute = getVietnamMinuteOfDay(startAt);
    const dateSchedules = await tx.doctorDateSchedule.findMany({
        where: {
            doctorId,
            workDate,
            isActive: true,
        },
        orderBy: {
            startMinute: "asc",
        },
    });
    const schedules = dateSchedules.length > 0
        ? dateSchedules
        : await tx.doctorSchedule.findMany({
            where: {
                doctorId,
                dayOfWeek,
                isActive: true,
            },
            orderBy: {
                startMinute: "asc",
            },
        });
    return schedules.find((schedule) => startMinute >= schedule.startMinute &&
        startMinute < schedule.endMinute &&
        (startMinute - schedule.startMinute) % schedule.slotMinutes === 0 &&
        startMinute + schedule.slotMinutes <= schedule.endMinute);
};
const createAppointmentAttempt = async (userId, input) => {
    return prisma.$transaction(async (tx) => {
        const [patient, doctor] = await Promise.all([
            tx.patientProfile.findUnique({
                where: {
                    userId,
                },
                select: {
                    id: true,
                },
            }),
            tx.doctorProfile.findFirst({
                where: {
                    id: input.doctorId,
                    user: {
                        isActive: true,
                    },
                    specialty: {
                        isActive: true,
                    },
                },
                select: {
                    id: true,
                },
            }),
        ]);
        if (!patient) {
            throw new Error("PATIENT_NOT_FOUND");
        }
        if (!doctor) {
            throw new Error("DOCTOR_NOT_FOUND");
        }
        const startAt = new Date(input.startAt);
        if (startAt <= new Date()) {
            throw new Error("APPOINTMENT_MUST_BE_FUTURE");
        }
        if (startAt.getUTCSeconds() !== 0 || startAt.getUTCMilliseconds() !== 0) {
            throw new Error("INVALID_APPOINTMENT_SLOT");
        }
        const schedule = await findValidSchedule(tx, doctor.id, startAt);
        if (!schedule) {
            throw new Error("INVALID_APPOINTMENT_SLOT");
        }
        const endAt = new Date(startAt.getTime() + schedule.slotMinutes * 60 * 1000);
        const [blocked, doctorConflict, patientConflict] = await Promise.all([
            tx.blockedTime.findFirst({
                where: {
                    doctorId: doctor.id,
                    startAt: {
                        lt: endAt,
                    },
                    endAt: {
                        gt: startAt,
                    },
                },
                select: {
                    id: true,
                },
            }),
            tx.appointment.findFirst({
                where: {
                    doctorId: doctor.id,
                    status: {
                        not: AppointmentStatus.CANCELLED,
                    },
                    startAt: {
                        lt: endAt,
                    },
                    endAt: {
                        gt: startAt,
                    },
                },
                select: {
                    id: true,
                },
            }),
            tx.appointment.findFirst({
                where: {
                    patientId: patient.id,
                    status: {
                        not: AppointmentStatus.CANCELLED,
                    },
                    startAt: {
                        lt: endAt,
                    },
                    endAt: {
                        gt: startAt,
                    },
                },
                select: {
                    id: true,
                },
            }),
        ]);
        if (blocked) {
            throw new Error("SLOT_BLOCKED");
        }
        if (doctorConflict) {
            throw new Error("SLOT_ALREADY_BOOKED");
        }
        if (patientConflict) {
            throw new Error("PATIENT_TIME_CONFLICT");
        }
        return tx.appointment.create({
            data: {
                patientId: patient.id,
                doctorId: doctor.id,
                startAt,
                endAt,
                status: AppointmentStatus.CONFIRMED,
            },
            include: appointmentInclude,
        });
    }, {
        isolationLevel: "Serializable",
    });
};
export const createAppointment = async (userId, input) => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
            return await createAppointmentAttempt(userId, input);
        }
        catch (error) {
            const code = typeof error === "object" && error !== null && "code" in error
                ? String(error.code ?? "")
                : "";
            if (code === "P2034" && attempt < 2) {
                continue;
            }
            throw error;
        }
    }
    throw new Error("SLOT_ALREADY_BOOKED");
};
export const getMyPatientAppointments = async (userId, query) => {
    const patient = await prisma.patientProfile.findUnique({
        where: {
            userId,
        },
        select: {
            id: true,
        },
    });
    if (!patient) {
        throw new Error("PATIENT_NOT_FOUND");
    }
    const now = new Date();
    return prisma.appointment.findMany({
        where: {
            patientId: patient.id,
            ...(query.scope === "upcoming" && {
                startAt: {
                    gte: now,
                },
                status: {
                    not: AppointmentStatus.CANCELLED,
                },
            }),
            ...(query.scope === "past" && {
                OR: [
                    { startAt: { lt: now } },
                    { status: AppointmentStatus.CANCELLED },
                ],
            }),
        },
        include: appointmentInclude,
        orderBy: {
            startAt: query.scope === "past" ? "desc" : "asc",
        },
    });
};
export const cancelMyPatientAppointment = async (userId, appointmentId, input) => {
    const appointment = await prisma.appointment.findFirst({
        where: {
            id: appointmentId,
            patient: {
                userId,
            },
        },
        include: appointmentInclude,
    });
    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }
    if (appointment.status === AppointmentStatus.CANCELLED) {
        throw new Error("APPOINTMENT_ALREADY_CANCELLED");
    }
    if (appointment.status === AppointmentStatus.COMPLETED) {
        throw new Error("APPOINTMENT_ALREADY_COMPLETED");
    }
    if (appointment.status ===
        AppointmentStatus.NEEDS_RESCHEDULE) {
        throw new Error("STAFF_ACTION_REQUIRED");
    }
    const minimumMs = env.PATIENT_CANCELLATION_MIN_HOURS * 60 * 60 * 1000;
    if (appointment.startAt.getTime() - Date.now() < minimumMs) {
        throw new Error("CANCELLATION_TOO_LATE");
    }
    return prisma.appointment.update({
        where: {
            id: appointment.id,
        },
        data: {
            status: AppointmentStatus.CANCELLED,
            cancelledAt: new Date(),
            cancelledByUserId: userId,
            cancellationSource: CancellationSource.PATIENT,
            cancellationReason: input.reason ??
                "Bệnh nhân chủ động hủy lịch hẹn.",
        },
        include: appointmentInclude,
    });
};
export const getMyDoctorAppointments = async (userId, query) => {
    const doctor = await prisma.doctorProfile.findUnique({
        where: {
            userId,
        },
        select: {
            id: true,
        },
    });
    if (!doctor) {
        throw new Error("DOCTOR_NOT_FOUND");
    }
    return prisma.appointment.findMany({
        where: {
            doctorId: doctor.id,
            ...(query.date !== undefined && {
                startAt: {
                    gte: parseVietnamDateStart(query.date),
                    lt: parseVietnamDateEnd(query.date),
                },
            }),
        },
        include: appointmentInclude,
        orderBy: {
            startAt: "asc",
        },
    });
};
export const completeMyDoctorAppointment = async (userId, appointmentId) => {
    const appointment = await prisma.appointment.findFirst({
        where: {
            id: appointmentId,
            doctor: {
                userId,
            },
        },
    });
    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }
    if (appointment.status === AppointmentStatus.CANCELLED) {
        throw new Error("APPOINTMENT_ALREADY_CANCELLED");
    }
    if (appointment.status ===
        AppointmentStatus.NEEDS_RESCHEDULE) {
        throw new Error("APPOINTMENT_NEEDS_RESCHEDULE");
    }
    if (appointment.status === AppointmentStatus.COMPLETED) {
        throw new Error("APPOINTMENT_ALREADY_COMPLETED");
    }
    if (appointment.startAt > new Date()) {
        throw new Error("APPOINTMENT_NOT_STARTED");
    }
    return prisma.appointment.update({
        where: {
            id: appointment.id,
        },
        data: {
            status: AppointmentStatus.COMPLETED,
            completedAt: new Date(),
        },
        include: appointmentInclude,
    });
};
export const getAllAppointments = async (query) => {
    return prisma.appointment.findMany({
        where: {
            ...(query.doctorId !== undefined && {
                doctorId: query.doctorId,
            }),
            ...(query.status !== undefined && {
                status: query.status,
            }),
            ...(query.date !== undefined && {
                startAt: {
                    gte: parseVietnamDateStart(query.date),
                    lt: parseVietnamDateEnd(query.date),
                },
            }),
        },
        include: appointmentInclude,
        orderBy: {
            startAt: "desc",
        },
    });
};
export const updateAppointmentStatusByStaff = async (userId, appointmentId, input) => {
    const appointment = await prisma.appointment.findUnique({
        where: {
            id: appointmentId,
        },
    });
    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }
    if (appointment.status ===
        AppointmentStatus.COMPLETED) {
        throw new Error("APPOINTMENT_ALREADY_COMPLETED");
    }
    if (appointment.status ===
        AppointmentStatus.CANCELLED) {
        throw new Error("APPOINTMENT_ALREADY_CANCELLED");
    }
    /*
     * Không được chỉ CONFIRM lại lịch bị bác sĩ block.
     * Admin phải đổi lịch hoặc hủy.
     */
    if (input.status === AppointmentStatus.CONFIRMED) {
        if (appointment.status ===
            AppointmentStatus.NEEDS_RESCHEDULE) {
            throw new Error("RESCHEDULE_REQUIRED");
        }
        return prisma.appointment.update({
            where: {
                id: appointment.id,
            },
            data: {
                status: AppointmentStatus.CONFIRMED,
            },
            include: appointmentInclude,
        });
    }
    /*
     * Nếu appointment đang NEEDS_RESCHEDULE
     * thì mặc định nguyên nhân đến từ DOCTOR.
     *
     * Nếu Admin tự hủy appointment bình thường
     * thì nguyên nhân là ADMIN.
     */
    const cancellationSource = input.cancellationSource ??
        (appointment.status ===
            AppointmentStatus.NEEDS_RESCHEDULE
            ? CancellationSource.DOCTOR
            : CancellationSource.ADMIN);
    const cancellationReason = cancellationSource === CancellationSource.DOCTOR
        ? "Bác sĩ có việc đột xuất."
        : input.reason ??
            "Phòng khám/lễ tân đã hủy lịch hẹn.";
    return prisma.appointment.update({
        where: {
            id: appointment.id,
        },
        data: {
            status: AppointmentStatus.CANCELLED,
            cancelledAt: new Date(),
            cancelledByUserId: userId,
            cancellationSource,
            cancellationReason,
            reschedulePreviousStatus: null,
        },
        include: appointmentInclude,
    });
};
export const rescheduleAppointmentByStaff = async (appointmentId, input) => {
    return prisma.$transaction(async (tx) => {
        const appointment = await tx.appointment.findUnique({
            where: {
                id: appointmentId,
            },
        });
        if (!appointment) {
            throw new Error("APPOINTMENT_NOT_FOUND");
        }
        if (appointment.status ===
            AppointmentStatus.CANCELLED) {
            throw new Error("APPOINTMENT_ALREADY_CANCELLED");
        }
        if (appointment.status ===
            AppointmentStatus.COMPLETED) {
            throw new Error("APPOINTMENT_ALREADY_COMPLETED");
        }
        const doctor = await tx.doctorProfile.findFirst({
            where: {
                id: appointment.doctorId,
                user: {
                    isActive: true,
                },
                specialty: {
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
        const startAt = new Date(input.startAt);
        if (startAt <= new Date()) {
            throw new Error("APPOINTMENT_MUST_BE_FUTURE");
        }
        if (startAt.getUTCSeconds() !== 0 ||
            startAt.getUTCMilliseconds() !== 0) {
            throw new Error("INVALID_APPOINTMENT_SLOT");
        }
        const schedule = await findValidSchedule(tx, doctor.id, startAt);
        if (!schedule) {
            throw new Error("INVALID_APPOINTMENT_SLOT");
        }
        const endAt = new Date(startAt.getTime() +
            schedule.slotMinutes * 60 * 1000);
        const [blocked, doctorConflict, patientConflict,] = await Promise.all([
            tx.blockedTime.findFirst({
                where: {
                    doctorId: doctor.id,
                    startAt: {
                        lt: endAt,
                    },
                    endAt: {
                        gt: startAt,
                    },
                },
                select: {
                    id: true,
                },
            }),
            tx.appointment.findFirst({
                where: {
                    id: {
                        not: appointment.id,
                    },
                    doctorId: doctor.id,
                    status: {
                        not: AppointmentStatus.CANCELLED,
                    },
                    startAt: {
                        lt: endAt,
                    },
                    endAt: {
                        gt: startAt,
                    },
                },
                select: {
                    id: true,
                },
            }),
            tx.appointment.findFirst({
                where: {
                    id: {
                        not: appointment.id,
                    },
                    patientId: appointment.patientId,
                    status: {
                        not: AppointmentStatus.CANCELLED,
                    },
                    startAt: {
                        lt: endAt,
                    },
                    endAt: {
                        gt: startAt,
                    },
                },
                select: {
                    id: true,
                },
            }),
        ]);
        if (blocked) {
            throw new Error("SLOT_BLOCKED");
        }
        if (doctorConflict) {
            throw new Error("SLOT_ALREADY_BOOKED");
        }
        if (patientConflict) {
            throw new Error("PATIENT_TIME_CONFLICT");
        }
        /*
         * Admin đã trao đổi với bệnh nhân và chọn
         * khung giờ mới nên lịch mới được CONFIRMED.
         */
        return tx.appointment.update({
            where: {
                id: appointment.id,
            },
            data: {
                startAt,
                endAt,
                status: AppointmentStatus.CONFIRMED,
                rescheduleReason: null,
                reschedulePreviousStatus: null,
                relatedBlockedTimeId: null,
                cancelledAt: null,
                cancelledByUserId: null,
                cancellationSource: null,
                cancellationReason: null,
            },
            include: appointmentInclude,
        });
    }, {
        isolationLevel: "Serializable",
    });
};
//# sourceMappingURL=appointment.service.js.map