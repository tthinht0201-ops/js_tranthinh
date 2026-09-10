import { z } from "zod";
export const registerSchema = z.object({
    email: z.email("Email không hợp lệ"),
    password: z
        .string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .max(72, "Mật khẩu quá dài"),
    fullName: z
        .string()
        .trim()
        .min(2, "Họ tên phải có ít nhất 2 ký tự")
        .max(150),
    phone: z
        .string()
        .trim()
        .min(9, "Số điện thoại không hợp lệ")
        .max(20),
    dateOfBirth: z.iso.date().optional(),
});
export const loginSchema = z.object({
    email: z.email("Email không hợp lệ"),
    password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});
//# sourceMappingURL=auth.schema.js.map