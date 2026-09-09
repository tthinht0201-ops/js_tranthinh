import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import aiRouter from "./modules/ai/ai.route.js";
import appointmentRouter from "./modules/appointments/appointment.route.js";
import authRouter from "./modules/auth/auth.route.js";
import doctorRouter from "./modules/doctors/doctor.route.js";
import patientRouter from "./modules/patients/patient.route.js";
import reviewRouter from "./modules/reviews/review.route.js";
import scheduleRouter from "./modules/schedules/schedule.route.js";
import specialtyRouter from "./modules/specialties/specialty.route.js";
import statisticsRouter from "./modules/statistics/statistics.route.js";

const app = express();

app.disable("x-powered-by");

if (env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Requests from tools/server-to-server clients may not send Origin.
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (env.CORS_ORIGIN.includes(normalizedOrigin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS_NOT_ALLOWED"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 40,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Medical Booking API is running",
  });
});

app.use("/api", apiLimiter);
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/patients", patientRouter);
app.use("/api/specialties", specialtyRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/doctor-schedules", scheduleRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/api/ai", aiRouter);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API không tồn tại",
  });
});

app.use(errorHandler);

export default app;
