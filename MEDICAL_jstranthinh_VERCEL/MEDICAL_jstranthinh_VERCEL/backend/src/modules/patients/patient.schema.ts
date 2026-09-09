import { z } from "zod";

export const updatePatientProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(150)
    .optional(),

  phone: z
    .string()
    .trim()
    .min(9, "Số điện thoại không hợp lệ")
    .max(20)
    .optional(),

  dateOfBirth: z
    .iso
    .date("Ngày sinh không hợp lệ")
    .nullable()
    .optional(),
});

export type UpdatePatientProfileInput =
  z.infer<typeof updatePatientProfileSchema>;