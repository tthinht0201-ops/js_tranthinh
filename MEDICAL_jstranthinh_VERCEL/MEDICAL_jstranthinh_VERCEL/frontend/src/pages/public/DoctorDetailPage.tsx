import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { ROUTES, doctorDetailPath } from "../../app/routes";
import { useAuth } from "../../auth/AuthContext";
import { api, getApiErrorMessage } from "../../lib/api";
import type { ApiResponse, AvailableSlot, Doctor, Review } from "../../types/api";

interface ReviewsResponse {
  average: number;
  totalReviews: number;
  reviews: Array<Review & { appointment: { patient: { fullName: string } } }>;
}

export const DoctorDetailPage = () => {
  const { id = "" } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const doctorQuery = useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Doctor>>(`/doctors/${id}`);
      return response.data.data;
    },
    enabled: Boolean(id),
  });

  const slotsQuery = useQuery({
    queryKey: ["available-slots", id, date],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ slots: AvailableSlot[] }>>(`/doctors/${id}/available-slots`, { params: { date } });
      return response.data.data.slots;
    },
    enabled: Boolean(id && date),
  });

  const reviewsQuery = useQuery({
    queryKey: ["doctor-reviews", id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<ReviewsResponse>>(`/reviews/doctors/${id}`);
      return response.data.data;
    },
    enabled: Boolean(id),
  });

  const bookMutation = useMutation({
    mutationFn: async (slot: AvailableSlot) => {
      const response = await api.post<ApiResponse<unknown>>("/appointments", {
        doctorId: id,
        startAt: slot.startAt,
      });
      return response.data;
    },
    onSuccess: async () => {
      setError("");
      setMessage("Đặt lịch thành công. Lịch khám đã được xác nhận ngay.");
      await queryClient.invalidateQueries({ queryKey: ["available-slots", id, date] });
    },
    onError: (err) => {
      setMessage("");
      setError(getApiErrorMessage(err));
    },
  });

  const minDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);

  const handleBook = (slot: AvailableSlot) => {
    if (!user) {
      navigate(ROUTES.login, { state: { from: doctorDetailPath(id ?? "") } });
      return;
    }
    if (user.role !== "PATIENT") {
      setError("Chỉ tài khoản bệnh nhân có thể đặt lịch khám.");
      return;
    }
    setMessage("");
    setError("");
    bookMutation.mutate(slot);
  };

  if (doctorQuery.isLoading) return <div className="page-state">Đang tải thông tin bác sĩ...</div>;
  if (doctorQuery.isError || !doctorQuery.data) return <div className="alert alert-error">Không tìm thấy bác sĩ.</div>;

  const doctor = doctorQuery.data;

  return (
    <div className="detail-layout">
      <section className="doctor-profile-card">
        <div className="doctor-avatar doctor-avatar-lg">
          {doctor.avatarUrl ? <img src={doctor.avatarUrl} alt={doctor.fullName} /> : <span>{doctor.fullName.slice(0, 1)}</span>}
        </div>
        <span className="tag">{doctor.specialty.name}</span>
        <h1>{doctor.fullName}</h1>
        <div className="rating-line">
          <strong>★ {doctor.rating?.average.toFixed(1) ?? "0.0"}</strong>
          <span>{doctor.rating?.totalReviews ?? 0} đánh giá</span>
        </div>
        <p><strong>Kinh nghiệm:</strong> {doctor.experienceYears} năm</p>
        <p className="profile-bio">{doctor.bio || "Bác sĩ đang cập nhật phần giới thiệu."}</p>
        <Link className="text-link" to={ROUTES.home}>← Quay lại danh sách</Link>
      </section>

      <div className="detail-main">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">LỊCH TRỐNG</span>
              <h2>Chọn ngày và giờ khám</h2>
            </div>
            <input className="input date-input" type="date" min={minDate} value={date} onChange={(event) => setDate(event.target.value)} />
          </div>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-error">{error}</div>}
          {slotsQuery.isLoading ? (
            <div className="page-state compact">Đang kiểm tra lịch trống...</div>
          ) : slotsQuery.data?.length ? (
            <div className="slot-grid">
              {slotsQuery.data.map((slot) => (
                <button
                  className="slot-button"
                  key={slot.startAt}
                  disabled={bookMutation.isPending}
                  onClick={() => handleBook(slot)}
                  type="button"
                >
                  <strong>{slot.startTime}</strong>
                  <span>đến {slot.endTime}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="empty-state">Không còn khung giờ trống trong ngày đã chọn.</div>
          )}
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">ĐÁNH GIÁ</span>
              <h2>Nhận xét từ bệnh nhân</h2>
            </div>
          </div>
          {reviewsQuery.data?.reviews.length ? (
            <div className="review-list">
              {reviewsQuery.data.reviews.map((review) => (
                <article className="review-card" key={review.id}>
                  <div className="review-head">
                    <strong>{review.appointment.patient.fullName}</strong>
                    <span>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                  </div>
                  <p>{review.comment || "Bệnh nhân không để lại nhận xét."}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">Bác sĩ chưa có đánh giá.</div>
          )}
        </section>
      </div>
    </div>
  );
};
