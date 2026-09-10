import { Router } from "express";
import { UserRole } from "../../generated/prisma/client.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import { createReviewController, getDoctorReviewsController, } from "./review.controller.js";
const reviewRouter = Router();
reviewRouter.get("/doctors/:doctorId", getDoctorReviewsController);
reviewRouter.post("/", requireAuth, requireRole(UserRole.PATIENT), createReviewController);
export default reviewRouter;
//# sourceMappingURL=review.route.js.map