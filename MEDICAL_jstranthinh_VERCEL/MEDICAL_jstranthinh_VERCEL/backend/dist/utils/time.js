import { DayOfWeek } from "../generated/prisma/client.js";
const VIETNAM_OFFSET_MS = 7 * 60 * 60 * 1000;
const pad2 = (value) => String(value).padStart(2, "0");
export const parseVietnamDateStart = (date) => {
    return new Date(`${date}T00:00:00.000+07:00`);
};
export const parseVietnamDateEnd = (date) => {
    return new Date(parseVietnamDateStart(date).getTime() + 24 * 60 * 60 * 1000);
};
export const dateAtVietnamMinute = (date, minuteOfDay) => {
    return new Date(parseVietnamDateStart(date).getTime() + minuteOfDay * 60 * 1000);
};
const toVietnamShiftedDate = (date) => {
    return new Date(date.getTime() + VIETNAM_OFFSET_MS);
};
export const toVietnamDateString = (date) => {
    const shifted = toVietnamShiftedDate(date);
    return [
        shifted.getUTCFullYear(),
        pad2(shifted.getUTCMonth() + 1),
        pad2(shifted.getUTCDate()),
    ].join("-");
};
export const getVietnamMinuteOfDay = (date) => {
    const shifted = toVietnamShiftedDate(date);
    return shifted.getUTCHours() * 60 + shifted.getUTCMinutes();
};
export const formatVietnamTime = (date) => {
    const shifted = toVietnamShiftedDate(date);
    return `${pad2(shifted.getUTCHours())}:${pad2(shifted.getUTCMinutes())}`;
};
const dayMap = {
    0: DayOfWeek.SUNDAY,
    1: DayOfWeek.MONDAY,
    2: DayOfWeek.TUESDAY,
    3: DayOfWeek.WEDNESDAY,
    4: DayOfWeek.THURSDAY,
    5: DayOfWeek.FRIDAY,
    6: DayOfWeek.SATURDAY,
};
export const getVietnamDayOfWeek = (date) => {
    const shifted = toVietnamShiftedDate(date);
    const result = dayMap[shifted.getUTCDay()];
    if (!result) {
        throw new Error("INVALID_DAY_OF_WEEK");
    }
    return result;
};
export const getDayOfWeekFromDateString = (date) => {
    return getVietnamDayOfWeek(new Date(`${date}T12:00:00.000+07:00`));
};
export const isValidDateString = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }
    const parsed = parseVietnamDateStart(value);
    return !Number.isNaN(parsed.getTime()) && toVietnamDateString(parsed) === value;
};
//# sourceMappingURL=time.js.map