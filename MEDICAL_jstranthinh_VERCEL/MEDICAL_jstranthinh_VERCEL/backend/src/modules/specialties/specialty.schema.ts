import { z } from "zod";

export const createSpecialtySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tên chuyên khoa phải có ít nhất 2 ký tự")
    .max(100, "Tên chuyên khoa không được vượt quá 100 ký tự"),

  description: z
    .string()
    .trim()
    .max(2000, "Mô tả quá dài")
    .nullable()
    .optional(),
});

export const updateSpecialtySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tên chuyên khoa phải có ít nhất 2 ký tự")
    .max(100)
    .optional(),

  description: z
    .string()
    .trim()
    .max(2000)
    .nullable()
    .optional(),

  isActive: z.boolean().optional(),
});

export const specialtyIdSchema = z.object({
  id: z.string().uuid("ID chuyên khoa không hợp lệ"),
});

export type CreateSpecialtyInput =
  z.infer<typeof createSpecialtySchema>;

export type UpdateSpecialtyInput =
  z.infer<typeof updateSpecialtySchema>;