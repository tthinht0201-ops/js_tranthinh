import { DayOfWeek } from "../generated/prisma/client.js";
export declare const parseVietnamDateStart: (date: string) => Date;
export declare const parseVietnamDateEnd: (date: string) => Date;
export declare const dateAtVietnamMinute: (date: string, minuteOfDay: number) => Date;
export declare const toVietnamDateString: (date: Date) => string;
export declare const getVietnamMinuteOfDay: (date: Date) => number;
export declare const formatVietnamTime: (date: Date) => string;
export declare const getVietnamDayOfWeek: (date: Date) => DayOfWeek;
export declare const getDayOfWeekFromDateString: (date: string) => DayOfWeek;
export declare const isValidDateString: (value: string) => boolean;
//# sourceMappingURL=time.d.ts.map