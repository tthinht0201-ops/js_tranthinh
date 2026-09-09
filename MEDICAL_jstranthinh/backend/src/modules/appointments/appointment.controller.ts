import type { Request, Response } from "express";

import {
  adminAppointmentsQuerySchema,
  adminUpdateAppointmentStatusSchema,
  appointmentIdSchema,
  cancelAppointmentSchema,
  createAppointmentSchema,
  doctorAppointmentsQuerySchema,
  patientAppointmentsQuerySchema,
  adminRescheduleAppointmentSchema,
} from "./appointment.schema.js";
import {
  cancelMyPatientAppointment,
  completeMyDoctorAppointment,
  createAppointment,
  getAllAppointments,
  getMyDoctorAppointments,
  getMyPatientAppointments,
  updateAppointmentStatusByStaff,
  rescheduleAppointmentByStaff,
} from "./appointment.service.js";

const currentUserId = (req: Request): string => {
  if (!req.user) {
    throw new Error("UNAUTHENTICATED");
  }
  return req.user.userId;
};

const handleAppointmentError = (error: unknown, res: Response): boolean => {
  if (!(error instanceof Error)) return false;

  const errors: Record<string, { status: number; message: string }> = {
    PATIENT_NOT_FOUND: { status: 404, message: "Không tìm thấy hồ sơ bệnh nhân" },
    DOCTOR_NOT_FOUND: { status: 404, message: "Không tìm thấy bác sĩ" },
    APPOINTMENT_NOT_FOUND: { status: 404, message: "Không tìm thấy lịch hẹn" },
    APPOINTMENT_MUST_BE_FUTURE: { status: 400, message: "Chỉ có thể đặt lịch ở thời điểm trong tương lai" },
    INVALID_APPOINTMENT_SLOT: { status: 400, message: "Khung giờ đã chọn không thuộc lịch làm việc của bác sĩ" },
    SLOT_BLOCKED: { status: 409, message: "Bác sĩ đã chặn khung giờ này" },
    SLOT_ALREADY_BOOKED: { status: 409, message: "Khung giờ này vừa được người khác đặt" },
    PATIENT_TIME_CONFLICT: { status: 409, message: "Bạn đã có lịch hẹn khác trong khung giờ này" },
    APPOINTMENT_ALREADY_CANCELLED: { status: 409, message: "Lịch hẹn đã được hủy" },
    APPOINTMENT_ALREADY_COMPLETED: { status: 409, message: "Lịch hẹn đã hoàn thành" },
    CANCELLATION_TOO_LATE: { status: 409, message: "Đã quá thời hạn cho phép bệnh nhân tự hủy lịch" },
    APPOINTMENT_NOT_STARTED: { status: 409, message: "Chưa đến thời gian khám nên chưa thể đánh dấu hoàn thành" },
    STAFF_ACTION_REQUIRED: { status: 409, message: "Lịch này đang cần lễ tân/phòng khám xử lý do thay đổi lịch của bác sĩ", },
    APPOINTMENT_NEEDS_RESCHEDULE: { status: 409, message: "Lịch này đang cần đổi lịch nên chưa thể đánh dấu đã khám", },
    RESCHEDULE_REQUIRED: { status: 409, message: "Lịch này bị ảnh hưởng bởi thời gian nghỉ của bác sĩ. Vui lòng đổi lịch hoặc hủy lịch", },
  };

  const mapped = errors[error.message];
  if (!mapped) return false;

  res.status(mapped.status).json({ success: false, message: mapped.message });
  return true;
};

export const createAppointmentController = async (req: Request, res: Response) => {
  const parsed = createAppointmentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Dữ liệu đặt lịch không hợp lệ",
      errors: parsed.error.flatten(),
    });
    return;
  }

  try {
    const data = await createAppointment(currentUserId(req), parsed.data);
    res.status(201).json({ success: true, message: "Đặt lịch khám thành công. Lịch đã được xác nhận tự động", data });
  } catch (error) {
    if (handleAppointmentError(error, res)) return;
    throw error;
  }
};

export const getMyPatientAppointmentsController = async (req: Request, res: Response) => {
  const parsed = patientAppointmentsQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "Bộ lọc lịch hẹn không hợp lệ" });
    return;
  }

  try {
    const data = await getMyPatientAppointments(currentUserId(req), parsed.data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (handleAppointmentError(error, res)) return;
    throw error;
  }
};

export const cancelMyPatientAppointmentController = async (req: Request, res: Response) => {
  const params = appointmentIdSchema.safeParse(req.params);
  const body = cancelAppointmentSchema.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ success: false, message: "Dữ liệu hủy lịch không hợp lệ" });
    return;
  }

  try {
    const data = await cancelMyPatientAppointment(currentUserId(req), params.data.id, body.data);
    res.status(200).json({ success: true, message: "Hủy lịch hẹn thành công", data });
  } catch (error) {
    if (handleAppointmentError(error, res)) return;
    throw error;
  }
};

export const getMyDoctorAppointmentsController = async (req: Request, res: Response) => {
  const parsed = doctorAppointmentsQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "Ngày xem lịch không hợp lệ" });
    return;
  }

  try {
    const data = await getMyDoctorAppointments(currentUserId(req), parsed.data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (handleAppointmentError(error, res)) return;
    throw error;
  }
};

export const completeMyDoctorAppointmentController = async (req: Request, res: Response) => {
  const parsed = appointmentIdSchema.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "ID lịch hẹn không hợp lệ" });
    return;
  }

  try {
    const data = await completeMyDoctorAppointment(currentUserId(req), parsed.data.id);
    res.status(200).json({ success: true, message: "Đã đánh dấu khám xong", data });
  } catch (error) {
    if (handleAppointmentError(error, res)) return;
    throw error;
  }
};

export const getAllAppointmentsController = async (req: Request, res: Response) => {
  const parsed = adminAppointmentsQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "Bộ lọc lịch hẹn không hợp lệ" });
    return;
  }

  const data = await getAllAppointments(parsed.data);
  res.status(200).json({ success: true, data });
};

export const updateAppointmentStatusByStaffController = async (req: Request, res: Response) => {
  const params = appointmentIdSchema.safeParse(req.params);
  const body = adminUpdateAppointmentStatusSchema.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ success: false, message: "Dữ liệu cập nhật lịch hẹn không hợp lệ" });
    return;
  }

  try {
    const data = await updateAppointmentStatusByStaff(currentUserId(req), params.data.id, body.data);
    res.status(200).json({ success: true, message: "Cập nhật trạng thái lịch hẹn thành công", data });
  } catch (error) {
    if (handleAppointmentError(error, res)) return;
    throw error;
  }
};

export const rescheduleAppointmentByStaffController =
  async (req: Request, res: Response) => {
    const params =
      appointmentIdSchema.safeParse(req.params);

    const body =
      adminRescheduleAppointmentSchema.safeParse(
        req.body,
      );

    if (!params.success || !body.success) {
      res.status(400).json({
        success: false,
        message:
          "Dữ liệu đổi lịch không hợp lệ",
        errors: body.success
          ? undefined
          : body.error.flatten(),
      });
      return;
    }

    try {
      const data =
        await rescheduleAppointmentByStaff(
          params.data.id,
          body.data,
        );

      res.status(200).json({
        success: true,
        message: "Đổi lịch hẹn thành công",
        data,
      });
    } catch (error) {
      if (handleAppointmentError(error, res))
        return;

      throw error;
    }
  };
