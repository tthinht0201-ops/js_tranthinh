import { getPatientProfile, updatePatientProfile, } from "./patient.service.js";
import { updatePatientProfileSchema, } from "./patient.schema.js";
export const getMyPatientProfileController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Bạn chưa đăng nhập",
        });
        return;
    }
    try {
        const patient = await getPatientProfile(req.user.userId);
        res.status(200).json({
            success: true,
            data: patient,
        });
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "PATIENT_NOT_FOUND") {
            res.status(404).json({
                success: false,
                message: "Không tìm thấy hồ sơ bệnh nhân",
            });
            return;
        }
        throw error;
    }
};
export const updateMyPatientProfileController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Bạn chưa đăng nhập",
        });
        return;
    }
    const parsed = updatePatientProfileSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Dữ liệu hồ sơ không hợp lệ",
            errors: parsed.error.flatten(),
        });
        return;
    }
    try {
        const patient = await updatePatientProfile(req.user.userId, parsed.data);
        res.status(200).json({
            success: true,
            message: "Cập nhật hồ sơ thành công",
            data: patient,
        });
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "PATIENT_NOT_FOUND") {
            res.status(404).json({
                success: false,
                message: "Không tìm thấy hồ sơ bệnh nhân",
            });
            return;
        }
        if (error instanceof Error &&
            error.message === "PHONE_ALREADY_EXISTS") {
            res.status(409).json({
                success: false,
                message: "Số điện thoại đã được sử dụng",
            });
            return;
        }
        throw error;
    }
};
//# sourceMappingURL=patient.controller.js.map