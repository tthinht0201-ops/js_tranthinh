import { DayOfWeek } from "../generated/prisma/client.js";

const VIETNAM_OFFSET_MS = 7 * 60 * 60 * 1000;

const pad2 = (value: number): string => String(value).padStart(2, "0");

export const parseVietnamDateStart = (date: string): Date => {
  return new Date(`${date}T00:00:00.000+07:00`);
};

export const parseVietnamDateEnd = (date: string): Date => {
  return new Date(parseVietnamDateStart(date).getTime() + 24 * 60 * 60 * 1000);
};

export const dateAtVietnamMinute = (
  date: string,
  minuteOfDay: number,
): Date => {
  return new Date(
    parseVietnamDateStart(date).getTime() + minuteOfDay * 60 * 1000,
  );
};

const toVietnamShiftedDate = (date: Date): Date => {
  return new Date(date.getTime() + VIETNAM_OFFSET_MS);
};

export const toVietnamDateString = (date: Date): string => {
  const shifted = toVietnamShiftedDate(date);

  return [
    shifted.getUTCFullYear(),
    pad2(shifted.getUTCMonth() + 1),
    pad2(shifted.getUTCDate()),
  ].join("-");
};

export const getVietnamMinuteOfDay = (date: Date): number => {
  const shifted = toVietnamShiftedDate(date);
  return shifted.getUTCHours() * 60 + shifted.getUTCMinutes();
};

export const formatVietnamTime = (date: Date): string => {
  const shifted = toVietnamShiftedDate(date);
  return `${pad2(shifted.getUTCHours())}:${pad2(shifted.getUTCMinutes())}`;
};

const dayMap: Record<number, DayOfWeek> = {
  0: DayOfWeek.SUNDAY,
  1: DayOfWeek.MONDAY,
  2: DayOfWeek.TUESDAY,
  3: DayOfWeek.WEDNESDAY,
  4: DayOfWeek.THURSDAY,
  5: DayOfWeek.FRIDAY,
  6: DayOfWeek.SATURDAY,
};

export const getVietnamDayOfWeek = (date: Date): DayOfWeek => {
  const shifted = toVietnamShiftedDate(date);
  const result = dayMap[shifted.getUTCDay()];

  if (!result) {
    throw new Error("INVALID_DAY_OF_WEEK");
  }

  return result;
};

export const getDayOfWeekFromDateString = (date: string): DayOfWeek => {
  return getVietnamDayOfWeek(
    new Date(`${date}T12:00:00.000+07:00`),
  );
};

export const isValidDateString = (value: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = parseVietnamDateStart(value);
  return !Number.isNaN(parsed.getTime()) && toVietnamDateString(parsed) === value;
};
