import { Router } from "express";
import { UserRole } from "../../generated/prisma/client.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import { cancelMyPatientAppointmentController, completeMyDoctorAppointmentController, createAppointmentController, getAllAppointmentsController, getMyDoctorAppointmentsController, getMyPatientAppointmentsController, updateAppointmentStatusByStaffController, rescheduleAppointmentByStaffController, } from "./appointment.controller.js";
const appointmentRouter = Router();
appointmentRouter.post("/", requireAuth, requireRole(UserRole.PATIENT), createAppointmentController);
appointmentRouter.get("/my", requireAuth, requireRole(UserRole.PATIENT), getMyPatientAppointmentsController);
appointmentRouter.patch("/my/:id/cancel", requireAuth, requireRole(UserRole.PATIENT), cancelMyPatientAppointmentController);
appointmentRouter.get("/doctor/me", requireAuth, requireRole(UserRole.DOCTOR), getMyDoctorAppointmentsController);
appointmentRouter.patch("/doctor/me/:id/complete", requireAuth, requireRole(UserRole.DOCTOR), completeMyDoctorAppointmentController);
appointmentRouter.get("/", requireAuth, requireRole(UserRole.ADMIN, UserRole.RECEPTIONIST), getAllAppointmentsController);
appointmentRouter.patch("/:id/reschedule", requireAuth, requireRole(UserRole.ADMIN, UserRole.RECEPTIONIST), rescheduleAppointmentByStaffController);
appointmentRouter.patch("/:id/status", requireAuth, requireRole(UserRole.ADMIN, UserRole.RECEPTIONIST), updateAppointmentStatusByStaffController);
export default appointmentRouter;
//# sourceMappingURL=appointment.route.js.map