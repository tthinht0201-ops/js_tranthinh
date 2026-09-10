import { Router } from "express";
import { UserRole } from "../../generated/prisma/client.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import { createSpecialtyController, deactivateSpecialtyController, getAllSpecialtiesController, getSpecialtyByIdController, updateSpecialtyController, } from "./specialty.controller.js";
const specialtyRouter = Router();
/*
 * Public routes
 */
specialtyRouter.get("/", getAllSpecialtiesController);
specialtyRouter.get("/:id", getSpecialtyByIdController);
/*
 * Admin routes
 */
specialtyRouter.post("/", requireAuth, requireRole(UserRole.ADMIN, UserRole.RECEPTIONIST), createSpecialtyController);
specialtyRouter.patch("/:id", requireAuth, requireRole(UserRole.ADMIN, UserRole.RECEPTIONIST), updateSpecialtyController);
specialtyRouter.delete("/:id", requireAuth, requireRole(UserRole.ADMIN, UserRole.RECEPTIONIST), deactivateSpecialtyController);
export default specialtyRouter;
//# sourceMappingURL=specialty.route.js.map