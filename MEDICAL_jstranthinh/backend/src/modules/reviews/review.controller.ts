import type { Request, Response } from "express";

import {
  createReviewSchema,
  doctorReviewsParamsSchema,
} from "./review.schema.js";
import {
  createReview,
  getDoctorReviews,
} from "./review.service.js";

const handleReviewError = (error: unknown, res: Response): boolean => {
  if (!(error instanceof Error)) return false;

  const errors: Record<string, { status: number; message: string }> = {
    APPOINTMENT_NOT_FOUND: { status: 404, message: "Không tìm thấy lịch hẹn" },
    APPOINTMENT_NOT_COMPLETED: { status: 409, message: "Chỉ có thể đánh giá sau khi khám xong" },
    REVIEW_ALREADY_EXISTS: { status: 409, message: "Lịch hẹn này đã được đánh giá" },
    DOCTOR_NOT_FOUND: { status: 404, message: "Không tìm thấy bác sĩ" },
  };

  const mapped = errors[error.message];
  if (!mapped) return false;

  res.status(mapped.status).json({ success: false, message: mapped.message });
  return true;
};

export const createReviewController = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: "Bạn chưa đăng nhập" });
    return;
  }

  const parsed = createReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Dữ liệu đánh giá không hợp lệ",
      errors: parsed.error.flatten(),
    });
    return;
  }

  try {
    const data = await createReview(req.user.userId, parsed.data);
    res.status(201).json({ success: true, message: "Đánh giá bác sĩ thành công", data });
  } catch (error) {
    if (handleReviewError(error, res)) return;
    throw error;
  }
};

export const getDoctorReviewsController = async (req: Request, res: Response) => {
  const parsed = doctorReviewsParamsSchema.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "ID bác sĩ không hợp lệ" });
    return;
  }

  try {
    const data = await getDoctorReviews(parsed.data.doctorId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (handleReviewError(error, res)) return;
    throw error;
  }
};
