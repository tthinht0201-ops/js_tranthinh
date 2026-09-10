import type { SpecialtySuggestionInput } from "./ai.schema.js";
export declare const suggestSpecialty: (input: SpecialtySuggestionInput) => Promise<{
    specialty: {
        id: string;
        name: string;
        description: string | null;
    };
    source: string;
    disclaimer: string;
}>;
//# sourceMappingURL=ai.service.d.ts.map