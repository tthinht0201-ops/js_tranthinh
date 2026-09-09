import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";

import { api, getApiErrorMessage } from "../../lib/api";
import type { ApiResponse, Specialty } from "../../types/api";

interface SuggestionResult {
  specialty: Specialty;
  source: "AI" | "FALLBACK";
  disclaimer: string;
}

export const AiSuggestionPage = () => {
  const [symptoms, setSymptoms] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post<ApiResponse<SuggestionResult>>("/ai/specialty-suggestion", { symptoms });
      return response.data.data;
    },
    onMutate: () => setError(""),
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  return (
    <section className="narrow-page ai-page">
      <span className="eyebrow">TRỢ LÝ CHỌN CHUYÊN KHOA</span>
      <h1>Mô tả triệu chứng của bạn</h1>
      <p className="muted">Hệ thống chỉ hỗ trợ định hướng chuyên khoa phù hợp để bạn tìm bác sĩ nhanh hơn.</p>

      <div className="panel form-stack">
        <label>
          <span>Triệu chứng đang gặp</span>
          <textarea
            className="input textarea"
            rows={7}
            placeholder="Ví dụ: Tôi thường xuyên đau đầu, chóng mặt và khó ngủ trong vài ngày gần đây..."
            value={symptoms}
            onChange={(event) => setSymptoms(event.target.value)}
          />
        </label>
        <button className="button button-primary" disabled={mutation.isPending || symptoms.trim().length < 10} onClick={() => mutation.mutate()} type="button">
          {mutation.isPending ? "Đang phân tích..." : "Gợi ý chuyên khoa"}
        </button>
        {error && <div className="alert alert-error">{error}</div>}
      </div>

      {mutation.data && (
        <div className="suggestion-card">
          <span className="tag">CHUYÊN KHOA GỢI Ý</span>
          <h2>{mutation.data.specialty.name}</h2>
          <p>{mutation.data.specialty.description || "Bạn có thể xem danh sách bác sĩ thuộc chuyên khoa này để lựa chọn lịch phù hợp."}</p>
          <div className="disclaimer">{mutation.data.disclaimer}</div>
          <Link className="button button-primary" to={`/?specialty=${mutation.data.specialty.id}`}>Xem bác sĩ phù hợp</Link>
        </div>
      )}
    </section>
  );
};
