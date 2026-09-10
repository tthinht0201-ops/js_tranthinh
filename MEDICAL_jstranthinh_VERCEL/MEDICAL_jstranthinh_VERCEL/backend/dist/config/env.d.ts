import "dotenv/config";
export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    CORS_ORIGIN: string[];
    PATIENT_CANCELLATION_MIN_HOURS: number;
    GEMINI_API_KEY?: string | undefined;
    GEMINI_MODEL?: string | undefined;
};
//# sourceMappingURL=env.d.ts.map