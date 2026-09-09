import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";

import { api, getApiErrorMessage } from "../../lib/api";
import type { ApiResponse, Appointment } from "../../types/api";

const statusLabel = {
  PENDING: "Lịch cũ chưa xử lý",
  CONFIRMED: "Đã xác nhận",
  NEEDS_RESCHEDULE: "Cần đổi lịch",
  COMPLETED: "Đã khám",
  CANCELLED: "Đã hủy",
} as const;

const AppointmentReviewForm = ({ appointment }: { appointment: Appointment }) => {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      await api.post("/reviews", {
        appointmentId: appointment.id,
        rating,
        comment: comment.trim() || null,
      });
    },
    onSuccess: async () => {
      setError("");
      await queryClient.invalidateQueries({ queryKey: ["my-appointments"] });
      await queryClient.invalidateQueries({ queryKey: ["doctor", appointment.doctorId] });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  return (
    <div className="review-form">
      <strong>Đánh giá bác sĩ</strong>
      <div className="inline-fields">
        <select className="input input-sm" value={rating} onChange={(event) => setRating(Number(event.target.value))}>
          {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} sao</option>)}
        </select>
        <input className="input" placeholder="Nhận xét (không bắt buộc)" value={comment} onChange={(event) => setComment(event.target.value)} />
        <button className="button button-primary" disabled={mutation.isPending} onClick={() => mutation.mutate()} type="button">Gửi</button>
      </div>
      {error && <small className="field-error">{error}</small>}
    </div>
  );
};

export const PatientAppointmentsPage = () => {
  const queryClient = useQueryClient();
  const [scope, setScope] = useState<"upcoming" | "past">("upcoming");
  const [error, setError] = useState("");

  const query = useQuery({
    queryKey: ["my-appointments", scope],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Appointment[]>>("/appointments/my", { params: { scope } });
      return response.data.data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/appointments/my/${id}/cancel`, { reason: "Bệnh nhân chủ động hủy lịch" });
    },
    onSuccess: async () => {
      setError("");
      await queryClient.invalidateQueries({ queryKey: ["my-appointments"] });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  return (
    <section className="section-block page-topless">
      <div className="section-heading">
        <div>
          <span className="eyebrow">LỊCH KHÁM CỦA TÔI</span>
          <h1>Quản lý lịch hẹn</h1>
        </div>
        <div className="segmented-control">
          <button className={scope === "upcoming" ? "active" : ""} onClick={() => setScope("upcoming")} type="button">Sắp tới</button>
          <button className={scope === "past" ? "active" : ""} onClick={() => setScope("past")} type="button">Đã qua</button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {query.isLoading ? (
        <div className="page-state">Đang tải lịch hẹn...</div>
      ) : query.data?.length ? (
        <div className="appointment-list">
          {query.data.map((appointment) => (
            <article className="appointment-card" key={appointment.id}>
              <div className="appointment-date">
                <strong>{format(new Date(appointment.startAt), "dd/MM")}</strong>
                <span>{format(new Date(appointment.startAt), "HH:mm")}</span>
              </div>
              <div className="appointment-main">
                <div className="appointment-title-row">
                  <div>
                    <span className="tag">{appointment.doctor.specialty.name}</span>
                    <h3>{appointment.doctor.fullName}</h3>
                  </div>
                  <span className={`status status-${appointment.status.toLowerCase()}`}>{statusLabel[appointment.status]}</span>
                </div>
                <p>Thời gian: {format(new Date(appointment.startAt), "HH:mm 'ngày' dd/MM/yyyy")} – {format(new Date(appointment.endAt), "HH:mm")}</p>
                {appointment.status ===
                  "NEEDS_RESCHEDULE" && (
                    <div className="alert alert-error">
                      <strong>
                        Lịch khám cần thay đổi
                      </strong>

                      <p>
                        {appointment.rescheduleReason ??
                          "Bác sĩ có việc đột xuất. Phòng khám sẽ liên hệ để hỗ trợ bạn đổi lịch hoặc hủy lịch."}
                      </p>
                    </div>
                  )}
                {appointment.status === "CANCELLED" && (
                  <p className="muted">
                    {appointment.cancellationSource ===
                      "DOCTOR"
                      ? "Lịch khám đã được hủy do bác sĩ có việc đột xuất."
                      : appointment.cancellationSource ===
                        "ADMIN"
                        ? `Lịch khám đã được phòng khám/lễ tân hủy${appointment.cancellationReason
                          ? `: ${appointment.cancellationReason}`
                          : "."
                        }`
                        : appointment.cancellationSource ===
                          "PATIENT"
                          ? "Bạn đã chủ động hủy lịch khám này."
                          : appointment.cancellationReason
                            ? `Lý do hủy: ${appointment.cancellationReason}`
                            : "Lịch khám đã được hủy."}
                  </p>
                )}
                {scope === "upcoming" && appointment.status !== "CANCELLED" &&appointment.status !== "COMPLETED" && appointment.status !== "NEEDS_RESCHEDULE" && (
                    <button className="button button-danger button-small" disabled={cancelMutation.isPending} onClick={() => cancelMutation.mutate(appointment.id)} type="button">Hủy lịch</button>
                  )}
                {appointment.status === "COMPLETED" && !appointment.review && <AppointmentReviewForm appointment={appointment} />}
                {appointment.review && <p className="success-text">Bạn đã đánh giá {appointment.review.rating}/5 sao.</p>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">Chưa có lịch hẹn trong nhóm này.</div>
      )}
    </section>
  );
};
