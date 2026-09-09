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

export const DoctorDashboardPage = () => {
  const queryClient = useQueryClient();
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [error, setError] = useState("");

  const query = useQuery({
    queryKey: ["doctor-appointments", date],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Appointment[]>>("/appointments/doctor/me", { params: { date } });
      return response.data.data;
    },
  });

  const completeMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/appointments/doctor/me/${id}/complete`);
    },
    onSuccess: async () => {
      setError("");
      await queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  return (
    <section className="section-block page-topless">
      <div className="section-heading">
        <div>
          <span className="eyebrow">LỊCH KHÁM BÁC SĨ</span>
          <h1>Danh sách bệnh nhân</h1>
        </div>
        <input className="input date-input" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {query.isLoading ? (
        <div className="page-state">Đang tải lịch khám...</div>
      ) : query.data?.length ? (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Giờ khám</th>
                <th>Bệnh nhân</th>
                <th>Liên hệ</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {query.data.map((appointment) => (
                <tr key={appointment.id}>
                  <td><strong>{format(new Date(appointment.startAt), "HH:mm")}</strong> – {format(new Date(appointment.endAt), "HH:mm")}</td>
                  <td>{appointment.patient.fullName}</td>
                  <td>{appointment.patient.phone}</td>
                  <td><span className={`status status-${appointment.status.toLowerCase()}`}>{statusLabel[appointment.status]}</span></td>
                  <td className="table-actions">
                    {appointment.status === "CONFIRMED" && (
                      <button className="button button-primary button-small" disabled={completeMutation.isPending} onClick={() => completeMutation.mutate(appointment.id)} type="button">
                        Đã khám xong
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">Không có bệnh nhân đặt lịch trong ngày này.</div>
      )}
    </section>
  );
};
