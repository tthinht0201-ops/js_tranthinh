import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly PatientProfile: "PatientProfile";
    readonly Specialty: "Specialty";
    readonly DoctorProfile: "DoctorProfile";
    readonly DoctorSchedule: "DoctorSchedule";
    readonly DoctorDateSchedule: "DoctorDateSchedule";
    readonly BlockedTime: "BlockedTime";
    readonly Appointment: "Appointment";
    readonly Review: "Review";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const PatientProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly fullName: "fullName";
    readonly phone: "phone";
    readonly dateOfBirth: "dateOfBirth";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PatientProfileScalarFieldEnum = (typeof PatientProfileScalarFieldEnum)[keyof typeof PatientProfileScalarFieldEnum];
export declare const SpecialtyScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SpecialtyScalarFieldEnum = (typeof SpecialtyScalarFieldEnum)[keyof typeof SpecialtyScalarFieldEnum];
export declare const DoctorProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly specialtyId: "specialtyId";
    readonly fullName: "fullName";
    readonly phone: "phone";
    readonly bio: "bio";
    readonly experienceYears: "experienceYears";
    readonly avatarUrl: "avatarUrl";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DoctorProfileScalarFieldEnum = (typeof DoctorProfileScalarFieldEnum)[keyof typeof DoctorProfileScalarFieldEnum];
export declare const DoctorScheduleScalarFieldEnum: {
    readonly id: "id";
    readonly doctorId: "doctorId";
    readonly dayOfWeek: "dayOfWeek";
    readonly startMinute: "startMinute";
    readonly endMinute: "endMinute";
    readonly slotMinutes: "slotMinutes";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DoctorScheduleScalarFieldEnum = (typeof DoctorScheduleScalarFieldEnum)[keyof typeof DoctorScheduleScalarFieldEnum];
export declare const DoctorDateScheduleScalarFieldEnum: {
    readonly id: "id";
    readonly doctorId: "doctorId";
    readonly workDate: "workDate";
    readonly startMinute: "startMinute";
    readonly endMinute: "endMinute";
    readonly slotMinutes: "slotMinutes";
    readonly isActive: "isActive";
    readonly note: "note";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DoctorDateScheduleScalarFieldEnum = (typeof DoctorDateScheduleScalarFieldEnum)[keyof typeof DoctorDateScheduleScalarFieldEnum];
export declare const BlockedTimeScalarFieldEnum: {
    readonly id: "id";
    readonly doctorId: "doctorId";
    readonly startAt: "startAt";
    readonly endAt: "endAt";
    readonly reason: "reason";
    readonly createdAt: "createdAt";
};
export type BlockedTimeScalarFieldEnum = (typeof BlockedTimeScalarFieldEnum)[keyof typeof BlockedTimeScalarFieldEnum];
export declare const AppointmentScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly doctorId: "doctorId";
    readonly startAt: "startAt";
    readonly endAt: "endAt";
    readonly status: "status";
    readonly rescheduleReason: "rescheduleReason";
    readonly reschedulePreviousStatus: "reschedulePreviousStatus";
    readonly relatedBlockedTimeId: "relatedBlockedTimeId";
    readonly cancelledAt: "cancelledAt";
    readonly cancellationReason: "cancellationReason";
    readonly cancellationSource: "cancellationSource";
    readonly cancelledByUserId: "cancelledByUserId";
    readonly completedAt: "completedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly appointmentId: "appointmentId";
    readonly rating: "rating";
    readonly comment: "comment";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map