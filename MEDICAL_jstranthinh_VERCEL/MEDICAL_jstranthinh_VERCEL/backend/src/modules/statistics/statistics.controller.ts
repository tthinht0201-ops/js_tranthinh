import type { Request, Response } from "express";

import { statisticsQuerySchema } from "./statistics.schema.js";
import { getAppointmentStatistics } from "./statistics.service.js";

export const getAppointmentStatisticsController = async (
  req: Request,
  res: Response,
) => {
  const parsed = statisticsQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "Khoảng thời gian thống kê không hợp lệ" });
    return;
  }

  try {
    const data = await getAppointmentStatistics(parsed.data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_DATE_RANGE") {
      res.status(400).json({ success: false, message: "Ngày kết thúc phải sau ngày bắt đầu" });
      return;
    }
    if (error instanceof Error && error.message === "DATE_RANGE_TOO_LARGE") {
      res.status(400).json({ success: false, message: "Khoảng thống kê tối đa 92 ngày" });
      return;
    }
    throw error;
  }
};
