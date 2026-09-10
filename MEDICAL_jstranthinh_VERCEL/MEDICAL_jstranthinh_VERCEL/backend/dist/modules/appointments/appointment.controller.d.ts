import type { Request, Response } from "express";
export declare const createAppointmentController: (req: Request, res: Response) => Promise<void>;
export declare const getMyPatientAppointmentsController: (req: Request, res: Response) => Promise<void>;
export declare const cancelMyPatientAppointmentController: (req: Request, res: Response) => Promise<void>;
export declare const getMyDoctorAppointmentsController: (req: Request, res: Response) => Promise<void>;
export declare const completeMyDoctorAppointmentController: (req: Request, res: Response) => Promise<void>;
export declare const getAllAppointmentsController: (req: Request, res: Response) => Promise<void>;
export declare const updateAppointmentStatusByStaffController: (req: Request, res: Response) => Promise<void>;
export declare const rescheduleAppointmentByStaffController: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=appointment.controller.d.ts.map