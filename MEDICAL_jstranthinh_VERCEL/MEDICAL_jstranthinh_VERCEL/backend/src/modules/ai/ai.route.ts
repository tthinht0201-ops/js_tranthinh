import { Router } from "express";

import { UserRole } from "../../generated/prisma/client.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import { suggestSpecialtyController } from "./ai.controller.js";

const aiRouter = Router();

aiRouter.post(
  "/specialty-suggestion",
  requireAuth,
  requireRole(UserRole.PATIENT),
  suggestSpecialtyController,
);

export default aiRouter;
