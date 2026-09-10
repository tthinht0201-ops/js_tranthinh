export declare const UserRole: {
    readonly PATIENT: "PATIENT";
    readonly DOCTOR: "DOCTOR";
    readonly ADMIN: "ADMIN";
    readonly RECEPTIONIST: "RECEPTIONIST";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const AppointmentStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly NEEDS_RESCHEDULE: "NEEDS_RESCHEDULE";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus];
export declare const CancellationSource: {
    readonly PATIENT: "PATIENT";
    readonly DOCTOR: "DOCTOR";
    readonly ADMIN: "ADMIN";
};
export type CancellationSource = (typeof CancellationSource)[keyof typeof CancellationSource];
export declare const DayOfWeek: {
    readonly MONDAY: "MONDAY";
    readonly TUESDAY: "TUESDAY";
    readonly WEDNESDAY: "WEDNESDAY";
    readonly THURSDAY: "THURSDAY";
    readonly FRIDAY: "FRIDAY";
    readonly SATURDAY: "SATURDAY";
    readonly SUNDAY: "SUNDAY";
};
export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];
//# sourceMappingURL=enums.d.ts.map