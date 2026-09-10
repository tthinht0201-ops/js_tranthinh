import { env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
const DISCLAIMER = "Gợi ý này chỉ nhằm hỗ trợ lựa chọn chuyên khoa, không phải chẩn đoán y khoa. Nếu triệu chứng nặng, diễn tiến nhanh hoặc có dấu hiệu cấp cứu, hãy liên hệ cơ sở y tế phù hợp.";
const keywordGroups = [
    {
        keywords: ["đau đầu", "chóng mặt", "mất ngủ", "tê", "co giật", "thần kinh"],
        specialtyHints: ["thần kinh", "nội thần kinh"],
    },
    {
        keywords: ["ho", "khó thở", "đau ngực", "phổi", "hen", "hô hấp"],
        specialtyHints: ["hô hấp", "nội", "nội tổng quát"],
    },
    {
        keywords: ["đau bụng", "dạ dày", "tiêu chảy", "táo bón", "tiêu hóa"],
        specialtyHints: ["tiêu hóa", "nội", "nội tổng quát"],
    },
    {
        keywords: ["da", "ngứa", "mụn", "phát ban", "dị ứng da"],
        specialtyHints: ["da liễu"],
    },
    {
        keywords: ["trẻ", "bé", "em bé", "sốt ở trẻ", "nhi"],
        specialtyHints: ["nhi", "nhi khoa"],
    },
    {
        keywords: ["tim", "huyết áp", "hồi hộp", "đánh trống ngực"],
        specialtyHints: ["tim mạch", "nội tim mạch"],
    },
    {
        keywords: ["lo âu", "căng thẳng", "stress", "buồn bã", "tâm lý"],
        specialtyHints: ["tâm lý", "tâm thần"],
    },
];
const normalize = (value) => value.trim().toLocaleLowerCase("vi");
const findHeuristicSpecialty = (symptoms, specialties) => {
    const normalizedSymptoms = normalize(symptoms);
    for (const group of keywordGroups) {
        if (!group.keywords.some((keyword) => normalizedSymptoms.includes(keyword))) {
            continue;
        }
        for (const hint of group.specialtyHints) {
            const found = specialties.find((specialty) => normalize(specialty.name).includes(hint));
            if (found) {
                return found;
            }
        }
    }
    return specialties.find((specialty) => {
        const name = normalize(specialty.name);
        return name.includes("nội") || name.includes("tổng quát");
    }) ?? specialties[0] ?? null;
};
const askGemini = async (symptoms, specialties) => {
    if (!env.GEMINI_API_KEY || !env.GEMINI_MODEL) {
        return null;
    }
    const specialtyList = specialties
        .map((specialty) => `- ${specialty.name}: ${specialty.description ?? ""}`)
        .join("\n");
    const prompt = [
        "Bạn là trợ lý phân luồng chuyên khoa cho một phòng khám tư nhân.",
        "Chỉ gợi ý MỘT chuyên khoa từ danh sách được cung cấp. Không chẩn đoán bệnh.",
        "Trả lời đúng tên chuyên khoa, không thêm giải thích.",
        "Danh sách chuyên khoa:",
        specialtyList,
        "Triệu chứng do bệnh nhân mô tả:",
        symptoms,
    ].join("\n");
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 50,
            },
        }),
    });
    if (!response.ok) {
        return null;
    }
    const payload = (await response.json());
    const text = payload.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) {
        return null;
    }
    const normalizedText = normalize(text);
    return specialties.find((specialty) => {
        const name = normalize(specialty.name);
        return normalizedText === name || normalizedText.includes(name);
    }) ?? null;
};
export const suggestSpecialty = async (input) => {
    const specialties = await prisma.specialty.findMany({
        where: {
            isActive: true,
        },
        select: {
            id: true,
            name: true,
            description: true,
        },
        orderBy: {
            name: "asc",
        },
    });
    if (specialties.length === 0) {
        throw new Error("NO_SPECIALTIES_AVAILABLE");
    }
    const aiSuggestion = await askGemini(input.symptoms, specialties);
    const specialty = aiSuggestion ?? findHeuristicSpecialty(input.symptoms, specialties);
    if (!specialty) {
        throw new Error("NO_SPECIALTIES_AVAILABLE");
    }
    return {
        specialty,
        source: aiSuggestion ? "AI" : "FALLBACK",
        disclaimer: DISCLAIMER,
    };
};
//# sourceMappingURL=ai.service.js.map