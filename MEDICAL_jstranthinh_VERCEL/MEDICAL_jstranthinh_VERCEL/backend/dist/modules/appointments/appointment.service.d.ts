import { AppointmentStatus, CancellationSource } from "../../generated/prisma/client.js";
import type { AdminAppointmentsQueryInput, AdminRescheduleAppointmentInput, AdminUpdateAppointmentStatusInput, CancelAppointmentInput, CreateAppointmentInput, DoctorAppointmentsQueryInput, PatientAppointmentsQueryInput } from "./appointment.schema.js";
export declare const createAppointment: (userId: string, input: CreateAppointmentInput) => Promise<{
    review: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        appointmentId: string;
        rating: number;
        comment: string | null;
    } | null;
    doctor: {
        id: string;
        specialty: {
            id: string;
            name: string;
        };
        fullName: string;
        phone: string | null;
        avatarUrl: string | null;
    };
    patient: {
        id: string;
        fullName: string;
        phone: string;
        dateOfBirth: Date | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    doctorId: string;
    status: AppointmentStatus;
    cancellationSource: CancellationSource | null;
    patientId: string;
    endAt: Date;
    rescheduleReason: string | null;
    reschedulePreviousStatus: AppointmentStatus | null;
    relatedBlockedTimeId: string | null;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    cancelledByUserId: string | null;
    completedAt: Date | null;
}>;
export declare const getMyPatientAppointments: (userId: string, query: PatientAppointmentsQueryInput) => Promise<({
    review: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        appointmentId: string;
        rating: number;
        comment: string | null;
    } | null;
    doctor: {
        id: string;
        specialty: {
            id: string;
            name: string;
        };
        fullName: string;
        phone: string | null;
        avatarUrl: string | null;
    };
    patient: {
        id: string;
        fullName: string;
        phone: string;
        dateOfBirth: Date | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    doctorId: string;
    status: AppointmentStatus;
    cancellationSource: CancellationSource | null;
    patientId: string;
    endAt: Date;
    rescheduleReason: string | null;
    reschedulePreviousStatus: AppointmentStatus | null;
    relatedBlockedTimeId: string | null;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    cancelledByUserId: string | null;
    completedAt: Date | null;
})[]>;
export declare const cancelMyPatientAppointment: (userId: string, appointmentId: string, input: CancelAppointmentInput) => Promise<{
    review: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        appointmentId: string;
        rating: number;
        comment: string | null;
    } | null;
    doctor: {
        id: string;
        specialty: {
            id: string;
            name: string;
        };
        fullName: string;
        phone: string | null;
        avatarUrl: string | null;
    };
    patient: {
        id: string;
        fullName: string;
        phone: string;
        dateOfBirth: Date | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    doctorId: string;
    status: AppointmentStatus;
    cancellationSource: CancellationSource | null;
    patientId: string;
    endAt: Date;
    rescheduleReason: string | null;
    reschedulePreviousStatus: AppointmentStatus | null;
    relatedBlockedTimeId: string | null;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    cancelledByUserId: string | null;
    completedAt: Date | null;
}>;
export declare const getMyDoctorAppointments: (userId: string, query: DoctorAppointmentsQueryInput) => Promise<({
    review: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        appointmentId: string;
        rating: number;
        comment: string | null;
    } | null;
    doctor: {
        id: string;
        specialty: {
            id: string;
            name: string;
        };
        fullName: string;
        phone: string | null;
        avatarUrl: string | null;
    };
    patient: {
        id: string;
        fullName: string;
        phone: string;
        dateOfBirth: Date | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    doctorId: string;
    status: AppointmentStatus;
    cancellationSource: CancellationSource | null;
    patientId: string;
    endAt: Date;
    rescheduleReason: string | null;
    reschedulePreviousStatus: AppointmentStatus | null;
    relatedBlockedTimeId: string | null;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    cancelledByUserId: string | null;
    completedAt: Date | null;
})[]>;
export declare const completeMyDoctorAppointment: (userId: string, appointmentId: string) => Promise<{
    review: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        appointmentId: string;
        rating: number;
        comment: string | null;
    } | null;
    doctor: {
        id: string;
        specialty: {
            id: string;
            name: string;
        };
        fullName: string;
        phone: string | null;
        avatarUrl: string | null;
    };
    patient: {
        id: string;
        fullName: string;
        phone: string;
        dateOfBirth: Date | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    doctorId: string;
    status: AppointmentStatus;
    cancellationSource: CancellationSource | null;
    patientId: string;
    endAt: Date;
    rescheduleReason: string | null;
    reschedulePreviousStatus: AppointmentStatus | null;
    relatedBlockedTimeId: string | null;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    cancelledByUserId: string | null;
    completedAt: Date | null;
}>;
export declare const getAllAppointments: (query: AdminAppointmentsQueryInput) => Promise<({
    review: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        appointmentId: string;
        rating: number;
        comment: string | null;
    } | null;
    doctor: {
        id: string;
        specialty: {
            id: string;
            name: string;
        };
        fullName: string;
        phone: string | null;
        avatarUrl: string | null;
    };
    patient: {
        id: string;
        fullName: string;
        phone: string;
        dateOfBirth: Date | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    doctorId: string;
    status: AppointmentStatus;
    cancellationSource: CancellationSource | null;
    patientId: string;
    endAt: Date;
    rescheduleReason: string | null;
    reschedulePreviousStatus: AppointmentStatus | null;
    relatedBlockedTimeId: string | null;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    cancelledByUserId: string | null;
    completedAt: Date | null;
})[]>;
export declare const updateAppointmentStatusByStaff: (userId: string, appointmentId: string, input: AdminUpdateAppointmentStatusInput) => Promise<{
    review: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        appointmentId: string;
        rating: number;
        comment: string | null;
    } | null;
    doctor: {
        id: string;
        specialty: {
            id: string;
            name: string;
        };
        fullName: string;
        phone: string | null;
        avatarUrl: string | null;
    };
    patient: {
        id: string;
        fullName: string;
        phone: string;
        dateOfBirth: Date | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    doctorId: string;
    status: AppointmentStatus;
    cancellationSource: CancellationSource | null;
    patientId: string;
    endAt: Date;
    rescheduleReason: string | null;
    reschedulePreviousStatus: AppointmentStatus | null;
    relatedBlockedTimeId: string | null;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    cancelledByUserId: string | null;
    completedAt: Date | null;
}>;
export declare const rescheduleAppointmentByStaff: (appointmentId: string, input: AdminRescheduleAppointmentInput) => Promise<{
    review: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        appointmentId: string;
        rating: number;
        comment: string | null;
    } | null;
    doctor: {
        id: string;
        specialty: {
            id: string;
            name: string;
        };
        fullName: string;
        phone: string | null;
        avatarUrl: string | null;
    };
    patient: {
        id: string;
        fullName: string;
        phone: string;
        dateOfBirth: Date | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    doctorId: string;
    status: AppointmentStatus;
    cancellationSource: CancellationSource | null;
    patientId: string;
    endAt: Date;
    rescheduleReason: string | null;
    reschedulePreviousStatus: AppointmentStatus | null;
    relatedBlockedTimeId: string | null;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    cancelledByUserId: string | null;
    completedAt: Date | null;
}>;
//# sourceMappingURL=appointment.service.d.ts.map