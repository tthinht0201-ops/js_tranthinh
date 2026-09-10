import { Router } from "express";
import { UserRole } from "../../generated/prisma/client.js";
import { requireAuth, } from "../../middlewares/auth.middleware.js";
import { requireRole, } from "../../middlewares/role.middleware.js";
import { getMyPatientProfileController, updateMyPatientProfileController, } from "./patient.controller.js";
const patientRouter = Router();
patientRouter.use(requireAuth, requireRole(UserRole.PATIENT));
patientRouter.get("/me", getMyPatientProfileController);
patientRouter.patch("/me", updateMyPatientProfileController);
export default patientRouter;
//# sourceMappingURL=patient.route.js.map