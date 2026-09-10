import { createDoctorSchema, doctorIdSchema, doctorQuerySchema, updateDoctorSchema, } from "./doctor.schema.js";
import { createDoctor, deactivateDoctor, getDoctorById, getDoctors, getDoctorsForStaff, updateDoctor, } from "./doctor.service.js";
const handleDoctorServiceError = (error, res) => {
    if (!(error instanceof Error)) {
        return false;
    }
    switch (error.message) {
        case "DOCTOR_NOT_FOUND":
            res.status(404).json({
                success: false,
                message: "Không tìm thấy bác sĩ",
            });
            return true;
        case "SPECIALTY_NOT_FOUND":
            res.status(404).json({
                success: false,
                message: "Không tìm thấy chuyên khoa",
            });
            return true;
        case "EMAIL_ALREADY_EXISTS":
            res.status(409).json({
                success: false,
                message: "Email đã được sử dụng",
            });
            return true;
        case "PHONE_ALREADY_EXISTS":
            res.status(409).json({
                success: false,
                message: "Số điện thoại đã được sử dụng",
            });
            return true;
        case "DOCTOR_ALREADY_INACTIVE":
            res.status(409).json({
                success: false,
                message: "Bác sĩ đã ngừng hoạt động",
            });
            return true;
        default:
            return false;
    }
};
export const getDoctorsController = async (req, res) => {
    const parsed = doctorQuerySchema.safeParse(req.query);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Tham số tìm kiếm không hợp lệ",
            errors: parsed.error.flatten(),
        });
        return;
    }
    const doctors = await getDoctors(parsed.data);
    res.status(200).json({
        success: true,
        data: doctors,
    });
};
export const getDoctorsForStaffController = async (_req, res) => {
    const doctors = await getDoctorsForStaff();
    res.status(200).json({
        success: true,
        data: doctors,
    });
};
export const getDoctorByIdController = async (req, res) => {
    const parsed = doctorIdSchema.safeParse(req.params);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "ID bác sĩ không hợp lệ",
        });
        return;
    }
    try {
        const doctor = await getDoctorById(parsed.data.id);
        res.status(200).json({
            success: true,
            data: doctor,
        });
    }
    catch (error) {
        if (handleDoctorServiceError(error, res)) {
            return;
        }
        throw error;
    }
};
export const createDoctorController = async (req, res) => {
    const parsed = createDoctorSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Dữ liệu bác sĩ không hợp lệ",
            errors: parsed.error.flatten(),
        });
        return;
    }
    try {
        const doctor = await createDoctor(parsed.data);
        res.status(201).json({
            success: true,
            message: "Tạo bác sĩ thành công",
            data: doctor,
        });
    }
    catch (error) {
        if (handleDoctorServiceError(error, res)) {
            return;
        }
        throw error;
    }
};
export const updateDoctorController = async (req, res) => {
    const paramsParsed = doctorIdSchema.safeParse(req.params);
    if (!paramsParsed.success) {
        res.status(400).json({
            success: false,
            message: "ID bác sĩ không hợp lệ",
        });
        return;
    }
    const bodyParsed = updateDoctorSchema.safeParse(req.body);
    if (!bodyParsed.success) {
        res.status(400).json({
            success: false,
            message: "Dữ liệu bác sĩ không hợp lệ",
            errors: bodyParsed.error.flatten(),
        });
        return;
    }
    try {
        const doctor = await updateDoctor(paramsParsed.data.id, bodyParsed.data);
        res.status(200).json({
            success: true,
            message: "Cập nhật bác sĩ thành công",
            data: doctor,
        });
    }
    catch (error) {
        if (handleDoctorServiceError(error, res)) {
            return;
        }
        throw error;
    }
};
export const deactivateDoctorController = async (req, res) => {
    const parsed = doctorIdSchema.safeParse(req.params);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "ID bác sĩ không hợp lệ",
        });
        return;
    }
    try {
        const doctor = await deactivateDoctor(parsed.data.id);
        res.status(200).json({
            success: true,
            message: "Ngừng hoạt động bác sĩ thành công",
            data: doctor,
        });
    }
    catch (error) {
        if (handleDoctorServiceError(error, res)) {
            return;
        }
        throw error;
    }
};
//# sourceMappingURL=doctor.controller.js.map