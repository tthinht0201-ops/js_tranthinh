import { availableSlotsParamsSchema, availableSlotsQuerySchema, blockedTimeIdSchema, blockedTimeQuerySchema, createBlockedTimeSchema, createDateScheduleSchema, createScheduleSchema, dateScheduleIdSchema, scheduleIdSchema, updateBlockedTimeSchema, updateDateScheduleSchema, updateScheduleSchema, } from "./schedule.schema.js";
import { createMyBlockedTime, createMyDateSchedule, createMySchedule, deleteMyBlockedTime, deleteMyDateSchedule, deleteMySchedule, getAvailableSlots, getMyBlockedTimes, getMyDateSchedules, getMySchedules, updateMyBlockedTime, updateMyDateSchedule, updateMySchedule, } from "./schedule.service.js";
const handleScheduleError = (error, res) => {
    if (!(error instanceof Error)) {
        return false;
    }
    const errors = {
        DOCTOR_NOT_FOUND: {
            status: 404,
            message: "Không tìm thấy hồ sơ bác sĩ",
        },
        SCHEDULE_NOT_FOUND: {
            status: 404,
            message: "Không tìm thấy lịch làm việc",
        },
        DATE_SCHEDULE_NOT_FOUND: {
            status: 404,
            message: "Không tìm thấy lịch làm việc theo ngày",
        },
        BLOCKED_TIME_NOT_FOUND: {
            status: 404,
            message: "Không tìm thấy thời gian nghỉ",
        },
        SCHEDULE_OVERLAP: {
            status: 409,
            message: "Khung giờ làm việc bị trùng với lịch hiện có",
        },
        DATE_SCHEDULE_OVERLAP: {
            status: 409,
            message: "Khung giờ của ngày này bị trùng với lịch ngày đã thiết lập",
        },
        BLOCKED_TIME_OVERLAP: {
            status: 409,
            message: "Khoảng thời gian nghỉ bị trùng với khoảng đã chặn",
        },
        INVALID_SCHEDULE_RANGE: {
            status: 400,
            message: "Khung giờ làm việc không hợp lệ",
        },
        INVALID_SLOT_DURATION: {
            status: 400,
            message: "Thời lượng lượt khám không hợp lệ",
        },
        INVALID_BLOCKED_TIME_RANGE: {
            status: 400,
            message: "Khoảng thời gian nghỉ không hợp lệ",
        },
        DATE_SCHEDULE_IN_PAST: {
            status: 400,
            message: "Không thể thiết lập lịch riêng cho ngày đã qua",
        },
    };
    const mapped = errors[error.message];
    if (!mapped) {
        return false;
    }
    res.status(mapped.status).json({
        success: false,
        message: mapped.message,
    });
    return true;
};
const currentUserId = (req) => {
    if (!req.user) {
        throw new Error("UNAUTHENTICATED");
    }
    return req.user.userId;
};
/* LỊCH TUẦN */
export const getMySchedulesController = async (req, res) => {
    const data = await getMySchedules(currentUserId(req));
    res.status(200).json({ success: true, data });
};
export const createMyScheduleController = async (req, res) => {
    const parsed = createScheduleSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Dữ liệu lịch làm việc không hợp lệ",
            errors: parsed.error.flatten(),
        });
        return;
    }
    try {
        const data = await createMySchedule(currentUserId(req), parsed.data);
        res.status(201).json({
            success: true,
            message: "Tạo lịch làm việc thành công",
            data,
        });
    }
    catch (error) {
        if (handleScheduleError(error, res))
            return;
        throw error;
    }
};
export const updateMyScheduleController = async (req, res) => {
    const params = scheduleIdSchema.safeParse(req.params);
    const body = updateScheduleSchema.safeParse(req.body);
    if (!params.success || !body.success) {
        res.status(400).json({
            success: false,
            message: "Dữ liệu cập nhật lịch không hợp lệ",
            errors: body.success ? undefined : body.error.flatten(),
        });
        return;
    }
    try {
        const data = await updateMySchedule(currentUserId(req), params.data.id, body.data);
        res.status(200).json({
            success: true,
            message: "Cập nhật lịch làm việc thành công",
            data,
        });
    }
    catch (error) {
        if (handleScheduleError(error, res))
            return;
        throw error;
    }
};
export const deleteMyScheduleController = async (req, res) => {
    const parsed = scheduleIdSchema.safeParse(req.params);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "ID lịch làm việc không hợp lệ",
        });
        return;
    }
    try {
        await deleteMySchedule(currentUserId(req), parsed.data.id);
        res.status(200).json({
            success: true,
            message: "Xóa lịch làm việc thành công",
        });
    }
    catch (error) {
        if (handleScheduleError(error, res))
            return;
        throw error;
    }
};
/* LỊCH THEO NGÀY CỤ THỂ */
export const getMyDateSchedulesController = async (req, res) => {
    const data = await getMyDateSchedules(currentUserId(req));
    res.status(200).json({ success: true, data });
};
export const createMyDateScheduleController = async (req, res) => {
    const parsed = createDateScheduleSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Dữ liệu lịch theo ngày không hợp lệ",
            errors: parsed.error.flatten(),
        });
        return;
    }
    try {
        const data = await createMyDateSchedule(currentUserId(req), parsed.data);
        res.status(201).json({
            success: true,
            message: "Tạo lịch theo ngày thành công",
            data,
        });
    }
    catch (error) {
        if (handleScheduleError(error, res))
            return;
        throw error;
    }
};
export const updateMyDateScheduleController = async (req, res) => {
    const params = dateScheduleIdSchema.safeParse(req.params);
    const body = updateDateScheduleSchema.safeParse(req.body);
    if (!params.success || !body.success) {
        res.status(400).json({
            success: false,
            message: "Dữ liệu cập nhật lịch theo ngày không hợp lệ",
            errors: body.success ? undefined : body.error.flatten(),
        });
        return;
    }
    try {
        const data = await updateMyDateSchedule(currentUserId(req), params.data.id, body.data);
        res.status(200).json({
            success: true,
            message: "Cập nhật lịch theo ngày thành công",
            data,
        });
    }
    catch (error) {
        if (handleScheduleError(error, res))
            return;
        throw error;
    }
};
export const deleteMyDateScheduleController = async (req, res) => {
    const parsed = dateScheduleIdSchema.safeParse(req.params);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "ID lịch theo ngày không hợp lệ",
        });
        return;
    }
    try {
        await deleteMyDateSchedule(currentUserId(req), parsed.data.id);
        res.status(200).json({
            success: true,
            message: "Xóa lịch theo ngày thành công",
        });
    }
    catch (error) {
        if (handleScheduleError(error, res))
            return;
        throw error;
    }
};
/* BLOCKED TIME*/
export const getMyBlockedTimesController = async (req, res) => {
    const parsed = blockedTimeQuerySchema.safeParse(req.query);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Bộ lọc thời gian không hợp lệ",
        });
        return;
    }
    const data = await getMyBlockedTimes(currentUserId(req), parsed.data);
    res.status(200).json({ success: true, data });
};
export const createMyBlockedTimeController = async (req, res) => {
    const parsed = createBlockedTimeSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Dữ liệu thời gian nghỉ không hợp lệ",
            errors: parsed.error.flatten(),
        });
        return;
    }
    try {
        const data = await createMyBlockedTime(currentUserId(req), parsed.data);
        res.status(201).json({
            success: true,
            message: "Đã chặn khung giờ",
            data,
        });
    }
    catch (error) {
        if (handleScheduleError(error, res))
            return;
        throw error;
    }
};
export const updateMyBlockedTimeController = async (req, res) => {
    const params = blockedTimeIdSchema.safeParse(req.params);
    const body = updateBlockedTimeSchema.safeParse(req.body);
    if (!params.success || !body.success) {
        res.status(400).json({
            success: false,
            message: "Dữ liệu cập nhật thời gian nghỉ không hợp lệ",
            errors: body.success ? undefined : body.error.flatten(),
        });
        return;
    }
    try {
        const data = await updateMyBlockedTime(currentUserId(req), params.data.id, body.data);
        res.status(200).json({
            success: true,
            message: "Cập nhật thời gian nghỉ thành công",
            data,
        });
    }
    catch (error) {
        if (handleScheduleError(error, res))
            return;
        throw error;
    }
};
export const deleteMyBlockedTimeController = async (req, res) => {
    const parsed = blockedTimeIdSchema.safeParse(req.params);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "ID thời gian nghỉ không hợp lệ",
        });
        return;
    }
    try {
        const data = await deleteMyBlockedTime(currentUserId(req), parsed.data.id);
        res.status(200).json({
            success: true,
            message: "Đã bỏ chặn khung giờ",
            data,
        });
    }
    catch (error) {
        if (handleScheduleError(error, res))
            return;
        throw error;
    }
};
/* SLOT TRỐNG */
export const getAvailableSlotsController = async (req, res) => {
    const params = availableSlotsParamsSchema.safeParse(req.params);
    const query = availableSlotsQuerySchema.safeParse(req.query);
    if (!params.success || !query.success) {
        res.status(400).json({
            success: false,
            message: "Bác sĩ hoặc ngày khám không hợp lệ",
        });
        return;
    }
    try {
        const data = await getAvailableSlots(params.data.doctorId, query.data.date);
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        if (handleScheduleError(error, res))
            return;
        throw error;
    }
};
//# sourceMappingURL=schedule.controller.js.map