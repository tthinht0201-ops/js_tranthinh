import { z } from "zod";
import { isValidDateString } from "../../utils/time.js";
const dateSchema = z.string().refine(isValidDateString, {
    message: "Ngày phải có định dạng YYYY-MM-DD",
});
export const statisticsQuerySchema = z.object({
    from: dateSchema.optional(),
    to: dateSchema.optional(),
});
//# sourceMappingURL=statistics.schema.js.map