import { Router } from "express";

import { UserRole } from "../../generated/prisma/client.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import { getAppointmentStatisticsController } from "./statistics.controller.js";

const statisticsRouter = Router();

statisticsRouter.get(
  "/appointments",
  requireAuth,
  requireRole(UserRole.ADMIN, UserRole.RECEPTIONIST),
  getAppointmentStatisticsController,
);

export default statisticsRouter;
