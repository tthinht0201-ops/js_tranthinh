import { z } from "zod";

export const doctorIdSchema = z.object({
  id: z.string().uuid("ID bác sĩ không hợp lệ"),
});

export const doctorQuerySchema = z.object({
  specialtyId: z
    .string()
    .uuid("ID chuyên khoa không hợp lệ")
    .optional(),

  q: z
    .string()
    .trim()
    .max(100)
    .optional(),
});

export const createDoctorSchema = z.object({
  email: z.email("Email không hợp lệ"),

  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(72, "Mật khẩu quá dài"),

  fullName: z
    .string()
    .trim()
    .min(2, "Họ tên bác sĩ phải có ít nhất 2 ký tự")
    .max(150),

  phone: z
    .string()
    .trim()
    .min(9, "Số điện thoại không hợp lệ")
    .max(20)
    .nullable()
    .optional(),

  specialtyId: z
    .string()
    .uuid("ID chuyên khoa không hợp lệ"),

  experienceYears: z
    .number()
    .int()
    .min(0)
    .max(80)
    .default(0),

  bio: z
    .string()
    .trim()
    .max(5000)
    .nullable()
    .optional(),

  avatarUrl: z
    .string()
    .url("URL ảnh đại diện không hợp lệ")
    .max(500)
    .nullable()
    .optional(),
});

export const updateDoctorSchema = z.object({
  email: z
    .email("Email không hợp lệ")
    .optional(),

  fullName: z
    .string()
    .trim()
    .min(2)
    .max(150)
    .optional(),

  phone: z
    .string()
    .trim()
    .min(9)
    .max(20)
    .nullable()
    .optional(),

  specialtyId: z
    .string()
    .uuid("ID chuyên khoa không hợp lệ")
    .optional(),

  experienceYears: z
    .number()
    .int()
    .min(0)
    .max(80)
    .optional(),

  bio: z
    .string()
    .trim()
    .max(5000)
    .nullable()
    .optional(),

  avatarUrl: z
    .string()
    .url("URL ảnh đại diện không hợp lệ")
    .max(500)
    .nullable()
    .optional(),

  isActive: z.boolean().optional(),
});

export type CreateDoctorInput =
  z.infer<typeof createDoctorSchema>;

export type UpdateDoctorInput =
  z.infer<typeof updateDoctorSchema>;

export type DoctorQueryInput =
  z.infer<typeof doctorQuerySchema>;