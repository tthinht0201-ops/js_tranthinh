import {
  AppointmentStatus,
  type DayOfWeek,
  type Prisma,
} from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import {
  dateAtVietnamMinute,
  formatVietnamTime,
  getDayOfWeekFromDateString,
  getVietnamMinuteOfDay,
  parseVietnamDateEnd,
  parseVietnamDateStart,
  toVietnamDateString,
} from "../../utils/time.js";

import type {
  BlockedTimeQueryInput,
  CreateBlockedTimeInput,
  CreateDateScheduleInput,
  CreateScheduleInput,
  UpdateBlockedTimeInput,
  UpdateDateScheduleInput,
  UpdateScheduleInput,
} from "./schedule.schema.js";

const DOCTOR_BLOCK_MESSAGE =
  "Bác sĩ có việc đột xuất. Phòng khám sẽ liên hệ để hỗ trợ đổi lịch hoặc hủy lịch.";

type ScheduleWindow = {
  startMinute: number;
  endMinute: number;
  slotMinutes: number;
};

const getDoctorByUserId = async (userId: string) => {
  const doctor = await prisma.doctorProfile.findFirst({
    where: {
      userId,
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

  return doctor;
};

const validateScheduleRange = (value: {
  startMinute: number;
  endMinute: number;
  slotMinutes: number;
}) => {
  if (value.endMinute <= value.startMinute) {
    throw new Error("INVALID_SCHEDULE_RANGE");
  }

  if (value.endMinute - value.startMinute < value.slotMinutes) {
    throw new Error("INVALID_SLOT_DURATION");
  }
};

const parseWorkDate = (date: string): Date => {
  return new Date(`${date}T00:00:00.000Z`);
};

const workDateToString = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

const ensureDateIsNotPast = (date: string) => {
  if (date < toVietnamDateString(new Date())) {
    throw new Error("DATE_SCHEDULE_IN_PAST");
  }
};

const dateScheduleReason = (date: string) => {
  const [year, month, day] = date.split("-");
  return `Bác sĩ đã điều chỉnh lịch làm việc ngày ${day}/${month}/${year}. Phòng khám sẽ liên hệ để hỗ trợ đổi lịch hoặc hủy lịch.`;
};
/* LỊCH TUẦN MẶC ĐỊNH */

const ensureNoScheduleOverlap = async (params: {
  doctorId: string;
  dayOfWeek: DayOfWeek;
  startMinute: number;
  endMinute: number;
  excludeId?: string;
}) => {
  const overlap = await prisma.doctorSchedule.findFirst({
    where: {
      doctorId: params.doctorId,
      dayOfWeek: params.dayOfWeek,
      isActive: true,
      startMinute: {
        lt: params.endMinute,
      },
      endMinute: {
        gt: params.startMinute,
      },
      ...(params.excludeId !== undefined && {
        id: {
          not: params.excludeId,
        },
      }),
    },
    select: {
      id: true,
    },
  });

  if (overlap) {
    throw new Error("SCHEDULE_OVERLAP");
  }
};

export const getMySchedules = async (userId: string) => {
  const doctor = await getDoctorByUserId(userId);

  return prisma.doctorSchedule.findMany({
    where: {
      doctorId: doctor.id,
    },
    orderBy: [{ dayOfWeek: "asc" }, { startMinute: "asc" }],
  });
};

export const createMySchedule = async (
  userId: string,
  input: CreateScheduleInput,
) => {
  const doctor = await getDoctorByUserId(userId);

  validateScheduleRange(input);

  await ensureNoScheduleOverlap({
    doctorId: doctor.id,
    dayOfWeek: input.dayOfWeek,
    startMinute: input.startMinute,
    endMinute: input.endMinute,
  });

  return prisma.doctorSchedule.create({
    data: {
      doctorId: doctor.id,
      dayOfWeek: input.dayOfWeek,
      startMinute: input.startMinute,
      endMinute: input.endMinute,
      slotMinutes: input.slotMinutes,
      isActive: true,
    },
  });
};

export const updateMySchedule = async (
  userId: string,
  scheduleId: string,
  input: UpdateScheduleInput,
) => {
  const doctor = await getDoctorByUserId(userId);

  const schedule = await prisma.doctorSchedule.findFirst({
    where: {
      id: scheduleId,
      doctorId: doctor.id,
    },
  });

  if (!schedule) {
    throw new Error("SCHEDULE_NOT_FOUND");
  }

  const nextValue = {
    dayOfWeek: input.dayOfWeek ?? schedule.dayOfWeek,
    startMinute: input.startMinute ?? schedule.startMinute,
    endMinute: input.endMinute ?? schedule.endMinute,
    slotMinutes: input.slotMinutes ?? schedule.slotMinutes,
    isActive: input.isActive ?? schedule.isActive,
  };

  validateScheduleRange(nextValue);

  if (nextValue.isActive) {
    await ensureNoScheduleOverlap({
      doctorId: doctor.id,
      dayOfWeek: nextValue.dayOfWeek,
      startMinute: nextValue.startMinute,
      endMinute: nextValue.endMinute,
      excludeId: schedule.id,
    });
  }

  return prisma.doctorSchedule.update({
    where: {
      id: schedule.id,
    },
    data: nextValue,
  });
};

export const deleteMySchedule = async (
  userId: string,
  scheduleId: string,
) => {
  const doctor = await getDoctorByUserId(userId);

  const schedule = await prisma.doctorSchedule.findFirst({
    where: {
      id: scheduleId,
      doctorId: doctor.id,
    },
    select: {
      id: true,
    },
  });

  if (!schedule) {
    throw new Error("SCHEDULE_NOT_FOUND");
  }

  await prisma.doctorSchedule.delete({
    where: {
      id: schedule.id,
    },
  });
};

/* LỊCH THEO NGÀY CỤ THỂ */

const ensureNoDateScheduleOverlap = async (
  tx: Prisma.TransactionClient,
  params: {
    doctorId: string;
    workDate: Date;
    startMinute: number;
    endMinute: number;
    excludeId?: string;
  },
) => {
  const overlap = await tx.doctorDateSchedule.findFirst({
    where: {
      doctorId: params.doctorId,
      workDate: params.workDate,
      isActive: true,
      startMinute: {
        lt: params.endMinute,
      },
      endMinute: {
        gt: params.startMinute,
      },
      ...(params.excludeId !== undefined && {
        id: {
          not: params.excludeId,
        },
      }),
    },
    select: {
      id: true,
    },
  });

  if (overlap) {
    throw new Error("DATE_SCHEDULE_OVERLAP");
  }
};

const getEffectiveSchedulesForDate = async (
  tx: Prisma.TransactionClient,
  doctorId: string,
  date: string,
) => {
  const workDate = parseWorkDate(date);

  const dateSchedules: ScheduleWindow[] = await tx.doctorDateSchedule.findMany({
    where: {
      doctorId,
      workDate,
      isActive: true,
    },
    orderBy: {
      startMinute: "asc",
    },
  });

  if (dateSchedules.length > 0) {
    return dateSchedules;
  }

  const dayOfWeek = getDayOfWeekFromDateString(date);

  return tx.doctorSchedule.findMany({
    where: {
      doctorId,
      dayOfWeek,
      isActive: true,
    },
    orderBy: {
      startMinute: "asc",
    },
  });
};

const appointmentFitsSchedules = (
  appointment: {
    startAt: Date;
    endAt: Date;
  },
  schedules: Array<{
    startMinute: number;
    endMinute: number;
    slotMinutes: number;
  }>,
) => {
  const startMinute = getVietnamMinuteOfDay(appointment.startAt);
  const durationMinutes = Math.round(
    (appointment.endAt.getTime() - appointment.startAt.getTime()) / 60_000,
  );

  return schedules.some(
    (schedule) =>
      startMinute >= schedule.startMinute &&
      startMinute + durationMinutes <= schedule.endMinute &&
      durationMinutes === schedule.slotMinutes &&
      (startMinute - schedule.startMinute) % schedule.slotMinutes === 0,
  );
};

const reconcileAppointmentsForDateSchedule = async (
  tx: Prisma.TransactionClient,
  doctorId: string,
  date: string,
) => {
  const schedules = await getEffectiveSchedulesForDate(tx, doctorId, date);
  const appointments = await tx.appointment.findMany({
    where: {
      doctorId,
      startAt: {
        gte: parseVietnamDateStart(date),
        lt: parseVietnamDateEnd(date),
      },
      status: {
        in: [
          AppointmentStatus.PENDING,
          AppointmentStatus.CONFIRMED,
          AppointmentStatus.NEEDS_RESCHEDULE,
        ],
      },
    },
    select: {
      id: true,
      startAt: true,
      endAt: true,
      status: true,
      reschedulePreviousStatus: true,
      relatedBlockedTimeId: true,
    },
  });

  for (const appointment of appointments) {
    // Nếu lịch đang cần xử lý do BlockedTime thì BlockedTime tiếp tục là nguồn ưu tiên.
    if (appointment.relatedBlockedTimeId) {
      continue;
    }

    const fits = appointmentFitsSchedules(appointment, schedules);

    if (
      !fits &&
      (appointment.status === AppointmentStatus.PENDING ||
        appointment.status === AppointmentStatus.CONFIRMED)
    ) {
      await tx.appointment.update({
        where: {
          id: appointment.id,
        },
        data: {
          status: AppointmentStatus.NEEDS_RESCHEDULE,
          reschedulePreviousStatus: appointment.status,
          rescheduleReason: dateScheduleReason(date),
          relatedBlockedTimeId: null,
        },
      });
      continue;
    }

    if (
      fits &&
      appointment.status === AppointmentStatus.NEEDS_RESCHEDULE &&
      (appointment.reschedulePreviousStatus === AppointmentStatus.PENDING ||
        appointment.reschedulePreviousStatus === AppointmentStatus.CONFIRMED)
    ) {
      await tx.appointment.update({
        where: {
          id: appointment.id,
        },
        data: {
          status: appointment.reschedulePreviousStatus,
          reschedulePreviousStatus: null,
          rescheduleReason: null,
          relatedBlockedTimeId: null,
        },
      });
    }
  }
};

export const getMyDateSchedules = async (userId: string) => {
  const doctor = await getDoctorByUserId(userId);

  return prisma.doctorDateSchedule.findMany({
    where: {
      doctorId: doctor.id,
    },
    orderBy: [{ workDate: "asc" }, { startMinute: "asc" }],
  });
};

export const createMyDateSchedule = async (
  userId: string,
  input: CreateDateScheduleInput,
) => {
  const doctor = await getDoctorByUserId(userId);

  validateScheduleRange(input);
  ensureDateIsNotPast(input.date);

  const workDate = parseWorkDate(input.date);

  return prisma.$transaction(async (tx) => {
    await ensureNoDateScheduleOverlap(tx, {
      doctorId: doctor.id,
      workDate,
      startMinute: input.startMinute,
      endMinute: input.endMinute,
    });

    const schedule = await tx.doctorDateSchedule.create({
      data: {
        doctorId: doctor.id,
        workDate,
        startMinute: input.startMinute,
        endMinute: input.endMinute,
        slotMinutes: input.slotMinutes,
        note: input.note ?? null,
        isActive: true,
      },
    });

    await reconcileAppointmentsForDateSchedule(tx, doctor.id, input.date);

    return schedule;
  });
};

export const updateMyDateSchedule = async (
  userId: string,
  scheduleId: string,
  input: UpdateDateScheduleInput,
) => {
  const doctor = await getDoctorByUserId(userId);

  return prisma.$transaction(async (tx) => {
    const schedule = await tx.doctorDateSchedule.findFirst({
      where: {
        id: scheduleId,
        doctorId: doctor.id,
      },
    });

    if (!schedule) {
      throw new Error("DATE_SCHEDULE_NOT_FOUND");
    }

    const oldDate = workDateToString(schedule.workDate);
    const nextDate = input.date ?? oldDate;
    const nextWorkDate = parseWorkDate(nextDate);

    ensureDateIsNotPast(nextDate);

    const nextValue = {
      startMinute: input.startMinute ?? schedule.startMinute,
      endMinute: input.endMinute ?? schedule.endMinute,
      slotMinutes: input.slotMinutes ?? schedule.slotMinutes,
      isActive: input.isActive ?? schedule.isActive,
    };

    validateScheduleRange(nextValue);

    if (nextValue.isActive) {
      await ensureNoDateScheduleOverlap(tx, {
        doctorId: doctor.id,
        workDate: nextWorkDate,
        startMinute: nextValue.startMinute,
        endMinute: nextValue.endMinute,
        excludeId: schedule.id,
      });
    }

    const updated = await tx.doctorDateSchedule.update({
      where: {
        id: schedule.id,
      },
      data: {
        workDate: nextWorkDate,
        startMinute: nextValue.startMinute,
        endMinute: nextValue.endMinute,
        slotMinutes: nextValue.slotMinutes,
        isActive: nextValue.isActive,
        ...(input.note !== undefined && {
          note: input.note,
        }),
      },
    });

    await reconcileAppointmentsForDateSchedule(tx, doctor.id, oldDate);

    if (nextDate !== oldDate) {
      await reconcileAppointmentsForDateSchedule(tx, doctor.id, nextDate);
    }

    return updated;
  });
};

export const deleteMyDateSchedule = async (
  userId: string,
  scheduleId: string,
) => {
  const doctor = await getDoctorByUserId(userId);

  return prisma.$transaction(async (tx) => {
    const schedule = await tx.doctorDateSchedule.findFirst({
      where: {
        id: scheduleId,
        doctorId: doctor.id,
      },
      select: {
        id: true,
        workDate: true,
      },
    });

    if (!schedule) {
      throw new Error("DATE_SCHEDULE_NOT_FOUND");
    }

    const date = workDateToString(schedule.workDate);

    await tx.doctorDateSchedule.delete({
      where: {
        id: schedule.id,
      },
    });

    // Khi xóa override cuối cùng, lịch ngày đó tự quay về lịch tuần mặc định.
    await reconcileAppointmentsForDateSchedule(tx, doctor.id, date);
  });
};

/* -------------------------------------------------------------------------- */
/* BLOCKED TIME                                                               */
/* -------------------------------------------------------------------------- */

const ensureNoBlockedTimeOverlap = async (params: {
  doctorId: string;
  startAt: Date;
  endAt: Date;
  excludeId?: string;
}) => {
  const overlap = await prisma.blockedTime.findFirst({
    where: {
      doctorId: params.doctorId,
      startAt: {
        lt: params.endAt,
      },
      endAt: {
        gt: params.startAt,
      },
      ...(params.excludeId !== undefined && {
        id: {
          not: params.excludeId,
        },
      }),
    },
    select: {
      id: true,
    },
  });

  if (overlap) {
    throw new Error("BLOCKED_TIME_OVERLAP");
  }
};

const markConflictingAppointments = async (
  tx: Prisma.TransactionClient,
  params: {
    doctorId: string;
    blockedTimeId: string;
    startAt: Date;
    endAt: Date;
  },
) => {
  const appointments = await tx.appointment.findMany({
    where: {
      doctorId: params.doctorId,
      status: {
        in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED],
      },
      startAt: {
        lt: params.endAt,
      },
      endAt: {
        gt: params.startAt,
      },
    },
    select: {
      id: true,
      status: true,
    },
  });

  for (const appointment of appointments) {
    await tx.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        status: AppointmentStatus.NEEDS_RESCHEDULE,
        reschedulePreviousStatus: appointment.status,
        relatedBlockedTimeId: params.blockedTimeId,
        rescheduleReason: DOCTOR_BLOCK_MESSAGE,
      },
    });
  }

  return appointments.length;
};

export const getMyBlockedTimes = async (
  userId: string,
  query: BlockedTimeQueryInput,
) => {
  const doctor = await getDoctorByUserId(userId);

  return prisma.blockedTime.findMany({
    where: {
      doctorId: doctor.id,
      ...(query.from !== undefined && {
        endAt: {
          gt: new Date(query.from),
        },
      }),
      ...(query.to !== undefined && {
        startAt: {
          lt: new Date(query.to),
        },
      }),
    },
    orderBy: {
      startAt: "asc",
    },
  });
};

export const createMyBlockedTime = async (
  userId: string,
  input: CreateBlockedTimeInput,
) => {
  const doctor = await getDoctorByUserId(userId);
  const startAt = new Date(input.startAt);
  const endAt = new Date(input.endAt);

  if (endAt <= startAt) {
    throw new Error("INVALID_BLOCKED_TIME_RANGE");
  }

  await ensureNoBlockedTimeOverlap({
    doctorId: doctor.id,
    startAt,
    endAt,
  });

  return prisma.$transaction(
    async (tx) => {
      const blockedTime = await tx.blockedTime.create({
        data: {
          doctorId: doctor.id,
          startAt,
          endAt,
          reason: input.reason ?? null,
        },
      });

      const affectedAppointmentsCount = await markConflictingAppointments(tx, {
        doctorId: doctor.id,
        blockedTimeId: blockedTime.id,
        startAt,
        endAt,
      });

      return {
        ...blockedTime,
        affectedAppointmentsCount,
      };
    },
    {
      isolationLevel: "Serializable",
    },
  );
};

export const updateMyBlockedTime = async (
  userId: string,
  blockedTimeId: string,
  input: UpdateBlockedTimeInput,
) => {
  const doctor = await getDoctorByUserId(userId);

  const blockedTime = await prisma.blockedTime.findFirst({
    where: {
      id: blockedTimeId,
      doctorId: doctor.id,
    },
  });

  if (!blockedTime) {
    throw new Error("BLOCKED_TIME_NOT_FOUND");
  }

  const startAt = input.startAt ? new Date(input.startAt) : blockedTime.startAt;
  const endAt = input.endAt ? new Date(input.endAt) : blockedTime.endAt;

  if (endAt <= startAt) {
    throw new Error("INVALID_BLOCKED_TIME_RANGE");
  }

  await ensureNoBlockedTimeOverlap({
    doctorId: doctor.id,
    startAt,
    endAt,
    excludeId: blockedTime.id,
  });

  return prisma.$transaction(async (tx) => {
    const previouslyAffected = await tx.appointment.findMany({
      where: {
        relatedBlockedTimeId: blockedTime.id,
        status: AppointmentStatus.NEEDS_RESCHEDULE,
      },
      select: {
        id: true,
        startAt: true,
        endAt: true,
        reschedulePreviousStatus: true,
      },
    });

    for (const appointment of previouslyAffected) {
      const stillOverlaps =
        appointment.startAt < endAt && appointment.endAt > startAt;

      if (!stillOverlaps) {
        const previousStatus =
          appointment.reschedulePreviousStatus === AppointmentStatus.CONFIRMED
            ? AppointmentStatus.CONFIRMED
            : AppointmentStatus.PENDING;

        await tx.appointment.update({
          where: {
            id: appointment.id,
          },
          data: {
            status: previousStatus,
            rescheduleReason: null,
            reschedulePreviousStatus: null,
            relatedBlockedTimeId: null,
          },
        });
      }
    }

    const updatedBlockedTime = await tx.blockedTime.update({
      where: {
        id: blockedTime.id,
      },
      data: {
        startAt,
        endAt,
        ...(input.reason !== undefined && {
          reason: input.reason,
        }),
      },
    });

    await markConflictingAppointments(tx, {
      doctorId: doctor.id,
      blockedTimeId: blockedTime.id,
      startAt,
      endAt,
    });

    const datesToReconcile = new Set(
      previouslyAffected.map((appointment) =>
        toVietnamDateString(appointment.startAt),
      ),
    );
    datesToReconcile.add(toVietnamDateString(startAt));

    for (const date of datesToReconcile) {
      await reconcileAppointmentsForDateSchedule(tx, doctor.id, date);
    }

    const affectedAppointmentsCount = await tx.appointment.count({
      where: {
        relatedBlockedTimeId: blockedTime.id,
        status: AppointmentStatus.NEEDS_RESCHEDULE,
      },
    });

    return {
      ...updatedBlockedTime,
      affectedAppointmentsCount,
    };
  });
};

export const deleteMyBlockedTime = async (
  userId: string,
  blockedTimeId: string,
) => {
  const doctor = await getDoctorByUserId(userId);

  const blockedTime = await prisma.blockedTime.findFirst({
    where: {
      id: blockedTimeId,
      doctorId: doctor.id,
    },
    select: {
      id: true,
    },
  });

  if (!blockedTime) {
    throw new Error("BLOCKED_TIME_NOT_FOUND");
  }

  return prisma.$transaction(async (tx) => {
    const affectedAppointments = await tx.appointment.findMany({
      where: {
        relatedBlockedTimeId: blockedTime.id,
        status: AppointmentStatus.NEEDS_RESCHEDULE,
      },
      select: {
        id: true,
        startAt: true,
        reschedulePreviousStatus: true,
      },
    });

    for (const appointment of affectedAppointments) {
      const previousStatus =
        appointment.reschedulePreviousStatus === AppointmentStatus.CONFIRMED
          ? AppointmentStatus.CONFIRMED
          : AppointmentStatus.PENDING;

      await tx.appointment.update({
        where: {
          id: appointment.id,
        },
        data: {
          status: previousStatus,
          rescheduleReason: null,
          reschedulePreviousStatus: null,
          relatedBlockedTimeId: null,
        },
      });
    }

    await tx.blockedTime.delete({
      where: {
        id: blockedTime.id,
      },
    });

    const datesToReconcile = new Set(
      affectedAppointments.map((appointment) =>
        toVietnamDateString(appointment.startAt),
      ),
    );

    for (const date of datesToReconcile) {
      await reconcileAppointmentsForDateSchedule(tx, doctor.id, date);
    }

    return {
      restoredAppointmentsCount: affectedAppointments.length,
    };
  });
};

/* -------------------------------------------------------------------------- */
/* SLOT TRỐNG CHO BỆNH NHÂN                                                   */
/* -------------------------------------------------------------------------- */

export const getAvailableSlots = async (doctorId: string, date: string) => {
  const doctor = await prisma.doctorProfile.findFirst({
    where: {
      id: doctorId,
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

  const dayOfWeek = getDayOfWeekFromDateString(date);
  const dayStart = parseVietnamDateStart(date);
  const dayEnd = parseVietnamDateEnd(date);
  const workDate = parseWorkDate(date);

  const dateSchedules: ScheduleWindow[] =
    await prisma.doctorDateSchedule.findMany({
      where: {
        doctorId,
        workDate,
        isActive: true,
      },
      orderBy: {
        startMinute: "asc",
      },
    });

  const [weeklySchedules, blockedTimes, appointments] = await Promise.all([
    prisma.doctorSchedule.findMany({
      where: {
        doctorId,
        dayOfWeek,
        isActive: true,
      },
      orderBy: {
        startMinute: "asc",
      },
    }),
    prisma.blockedTime.findMany({
      where: {
        doctorId,
        startAt: {
          lt: dayEnd,
        },
        endAt: {
          gt: dayStart,
        },
      },
      select: {
        startAt: true,
        endAt: true,
      },
    }),
    prisma.appointment.findMany({
      where: {
        doctorId,
        status: {
          not: AppointmentStatus.CANCELLED,
        },
        startAt: {
          lt: dayEnd,
        },
        endAt: {
          gt: dayStart,
        },
      },
      select: {
        startAt: true,
        endAt: true,
      },
    }),
  ]);

  // Chỉ cần có một lịch ngày cụ thể thì toàn bộ lịch tuần của ngày đó bị ghi đè.
  const schedules =
    dateSchedules.length > 0 ? dateSchedules : weeklySchedules;

  const now = new Date();
  const slots: Array<{
    startAt: string;
    endAt: string;
    startTime: string;
    endTime: string;
  }> = [];

  for (const schedule of schedules) {
    for (
      let minute = schedule.startMinute;
      minute + schedule.slotMinutes <= schedule.endMinute;
      minute += schedule.slotMinutes
    ) {
      const startAt = dateAtVietnamMinute(date, minute);
      const endAt = dateAtVietnamMinute(date, minute + schedule.slotMinutes);

      if (startAt <= now) {
        continue;
      }

      const isBlocked = blockedTimes.some(
        (blocked) => blocked.startAt < endAt && blocked.endAt > startAt,
      );

      if (isBlocked) {
        continue;
      }

      const isBooked = appointments.some(
        (appointment) =>
          appointment.startAt < endAt && appointment.endAt > startAt,
      );

      if (isBooked) {
        continue;
      }

      slots.push({
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        startTime: formatVietnamTime(startAt),
        endTime: formatVietnamTime(endAt),
      });
    }
  }

  return {
    doctorId,
    date,
    dayOfWeek,
    scheduleSource: dateSchedules.length > 0 ? "DATE" : "WEEKLY",
    slots,
  };
};
