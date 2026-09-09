import "dotenv/config";
import { z } from "zod";

const commaSeparatedOrigins = z
  .string()
  .default("http://localhost:5173")
  .transform((value) =>
    value
      .split(",")
      .map((origin) => origin.trim().replace(/\/$/, ""))
      .filter(Boolean),
  )
  .refine((origins) => origins.length > 0, {
    message: "CORS_ORIGIN must contain at least one origin",
  });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(5000),

  DATABASE_URL: z.string().min(1),

  JWT_SECRET: z.string().min(16),

  CORS_ORIGIN: commaSeparatedOrigins,

  PATIENT_CANCELLATION_MIN_HOURS: z.coerce
    .number()
    .min(0)
    .default(2),

  GEMINI_API_KEY: z.string().min(1).optional(),
  GEMINI_MODEL: z.string().min(1).optional(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment variables:", result.error.flatten());
  process.exit(1);
}

if (
  result.data.NODE_ENV === "production" &&
  result.data.JWT_SECRET.length < 32
) {
  console.error("Invalid environment variables: JWT_SECRET must be at least 32 characters in production");
  process.exit(1);
}

export const env = result.data;
