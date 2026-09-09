import { AppointmentStatus } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import {
  parseVietnamDateEnd,
  parseVietnamDateStart,
  toVietnamDateString,
} from "../../utils/time.js";

import type { StatisticsQueryInput } from "./statistics.schema.js";

const DAY_MS = 24 * 60 * 60 * 1000;

const getDefaultRange = () => {
  const now = new Date();
  const today = toVietnamDateString(now);
  const to = parseVietnamDateEnd(today);
  const from = new Date(to.getTime() - 7 * DAY_MS);
  return { from, to };
};

export const getAppointmentStatistics = async (
  query: StatisticsQueryInput,
) => {
  const defaults = getDefaultRange();
  const from = query.from ? parseVietnamDateStart(query.from) : defaults.from;
  const to = query.to ? parseVietnamDateEnd(query.to) : defaults.to;

  if (to <= from) {
    throw new Error("INVALID_DATE_RANGE");
  }

  if (to.getTime() - from.getTime() > 92 * DAY_MS) {
    throw new Error("DATE_RANGE_TOO_LARGE");
  }

  const [appointments, statusGroups, doctorGroups] = await Promise.all([
    prisma.appointment.findMany({
      where: {
        startAt: {
          gte: from,
          lt: to,
        },
      },
      select: {
        startAt: true,
        status: true,
      },
      orderBy: {
        startAt: "asc",
      },
    }),
    prisma.appointment.groupBy({
      by: ["status"],
      where: {
        startAt: {
          gte: from,
          lt: to,
        },
      },
      _count: {
        _all: true,
      },
    }),
    prisma.appointment.groupBy({
      by: ["doctorId"],
      where: {
        startAt: {
          gte: from,
          lt: to,
        },
        status: {
          not: AppointmentStatus.CANCELLED,
        },
      },
      _count: {
        _all: true,
      },
      orderBy: {
        _count: {
          doctorId: "desc",
        },
      },
      take: 5,
    }),
  ]);

  const dailyMap = new Map<string, number>();
  for (const appointment of appointments) {
    const key = toVietnamDateString(appointment.startAt);
    dailyMap.set(key, (dailyMap.get(key) ?? 0) + 1);
  }

  const doctorIds = doctorGroups.map((item) => item.doctorId);
  const doctors = doctorIds.length
    ? await prisma.doctorProfile.findMany({
        where: {
          id: {
            in: doctorIds,
          },
        },
        select: {
          id: true,
          fullName: true,
          specialty: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
    : [];

  const doctorMap = new Map(doctors.map((doctor) => [doctor.id, doctor]));

  return {
    range: {
      from: toVietnamDateString(from),
      to: toVietnamDateString(new Date(to.getTime() - 1)),
    },
    totalAppointments: appointments.length,
    byStatus: statusGroups.map((item) => ({
      status: item.status,
      count: item._count._all,
    })),
    byDay: Array.from(dailyMap.entries()).map(([date, count]) => ({ date, count })),
    topDoctors: doctorGroups.flatMap((item) => {
      const doctor = doctorMap.get(item.doctorId);
      if (!doctor) return [];
      return [{
        doctor,
        appointmentCount: item._count._all,
      }];
    }),
  };
};
