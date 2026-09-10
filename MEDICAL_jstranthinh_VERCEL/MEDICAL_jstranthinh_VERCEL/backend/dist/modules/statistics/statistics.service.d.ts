import { AppointmentStatus } from "../../generated/prisma/client.js";
import type { StatisticsQueryInput } from "./statistics.schema.js";
export declare const getAppointmentStatistics: (query: StatisticsQueryInput) => Promise<{
    range: {
        from: string;
        to: string;
    };
    totalAppointments: number;
    byStatus: {
        status: AppointmentStatus;
        count: number;
    }[];
    byDay: {
        date: string;
        count: number;
    }[];
    topDoctors: {
        doctor: {
            id: string;
            specialty: {
                id: string;
                name: string;
            };
            fullName: string;
        };
        appointmentCount: number;
    }[];
}>;
//# sourceMappingURL=statistics.service.d.ts.map