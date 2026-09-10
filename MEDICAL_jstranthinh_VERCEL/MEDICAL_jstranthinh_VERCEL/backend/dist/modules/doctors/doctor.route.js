import { Router } from "express";
import { UserRole } from "../../generated/prisma/client.js";
import { requireAuth, } from "../../middlewares/auth.middleware.js";
import { requireRole, } from "../../middlewares/role.middleware.js";
import { getAvailableSlotsController } from "../schedules/schedule.controller.js";
import { createDoctorController, deactivateDoctorController, getDoctorByIdController, getDoctorsController, getDoctorsForStaffController, updateDoctorController, } from "./doctor.controller.js";
const doctorRouter = Router();
/*
 * Public
 */
doctorRouter.get("/", getDoctorsController);
doctorRouter.get("/admin/all", requireAuth, requireRole(UserRole.ADMIN, UserRole.RECEPTIONIST), getDoctorsForStaffController);
doctorRouter.get("/:doctorId/available-slots", getAvailableSlotsController);
doctorRouter.get("/:id", getDoctorByIdController);
/*
 * ADMIN / RECEPTIONIST
 */
doctorRouter.post("/", requireAuth, requireRole(UserRole.ADMIN, UserRole.RECEPTIONIST), createDoctorController);
doctorRouter.patch("/:id", requireAuth, requireRole(UserRole.ADMIN, UserRole.RECEPTIONIST), updateDoctorController);
doctorRouter.delete("/:id", requireAuth, requireRole(UserRole.ADMIN, UserRole.RECEPTIONIST), deactivateDoctorController);
export default doctorRouter;
//# sourceMappingURL=doctor.route.js.map