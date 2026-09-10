import { Router } from "express";
import { UserRole } from "../../generated/prisma/client.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import { createMyBlockedTimeController, createMyDateScheduleController, createMyScheduleController, deleteMyBlockedTimeController, deleteMyDateScheduleController, deleteMyScheduleController, getMyBlockedTimesController, getMyDateSchedulesController, getMySchedulesController, updateMyBlockedTimeController, updateMyDateScheduleController, updateMyScheduleController, } from "./schedule.controller.js";
const scheduleRouter = Router();
scheduleRouter.use(requireAuth, requireRole(UserRole.DOCTOR));
// Lịch tuần mặc định
scheduleRouter.get("/me", getMySchedulesController);
scheduleRouter.post("/me", createMyScheduleController);
scheduleRouter.patch("/me/:id", updateMyScheduleController);
scheduleRouter.delete("/me/:id", deleteMyScheduleController);
// Lịch ghi đè theo ngày cụ thể
scheduleRouter.get("/date-schedules/me", getMyDateSchedulesController);
scheduleRouter.post("/date-schedules/me", createMyDateScheduleController);
scheduleRouter.patch("/date-schedules/me/:id", updateMyDateScheduleController);
scheduleRouter.delete("/date-schedules/me/:id", deleteMyDateScheduleController);
// Thời gian nghỉ/bận đột xuất
scheduleRouter.get("/blocked-times/me", getMyBlockedTimesController);
scheduleRouter.post("/blocked-times/me", createMyBlockedTimeController);
scheduleRouter.patch("/blocked-times/me/:id", updateMyBlockedTimeController);
scheduleRouter.delete("/blocked-times/me/:id", deleteMyBlockedTimeController);
export default scheduleRouter;
//# sourceMappingURL=schedule.route.js.map