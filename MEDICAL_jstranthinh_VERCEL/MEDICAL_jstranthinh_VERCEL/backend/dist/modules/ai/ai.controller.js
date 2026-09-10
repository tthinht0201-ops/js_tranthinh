import { specialtySuggestionSchema } from "./ai.schema.js";
import { suggestSpecialty } from "./ai.service.js";
export const suggestSpecialtyController = async (req, res) => {
    const parsed = specialtySuggestionSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Mô tả triệu chứng không hợp lệ",
            errors: parsed.error.flatten(),
        });
        return;
    }
    try {
        const data = await suggestSpecialty(parsed.data);
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        if (error instanceof Error && error.message === "NO_SPECIALTIES_AVAILABLE") {
            res.status(409).json({ success: false, message: "Hệ thống chưa có chuyên khoa  hoạt động" });
            return;
        }
        throw error;
    }
};
//# sourceMappingURL=ai.controller.js.map