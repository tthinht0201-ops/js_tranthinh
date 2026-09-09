import { z } from "zod";

export const specialtySuggestionSchema = z.object({
  symptoms: z
    .string()
    .trim()
    .min(10, "Mô tả triệu chứng cần ít nhất 10 ký tự")
    .max(1500, "Mô tả triệu chứng tối đa 1500 ký tự"),
});

export type SpecialtySuggestionInput = z.infer<typeof specialtySuggestionSchema>;
