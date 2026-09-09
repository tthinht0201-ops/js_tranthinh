import { useQuery } from "@tanstack/react-query";

import { api } from "../../lib/api";
import type { ApiResponse, AppointmentStatus } from "../../types/api";

interface StatisticsResponse {
  range: { from: string; to: string };
  totalAppointments: number;
  byStatus: Array<{ status: AppointmentStatus; count: number }>;
  byDay: Array<{ date: string; count: number }>;
  topDoctors: Array<{
    doctor: {
      id: string;
      fullName: string;
      specialty: { id: string; name: string };
    };
    appointmentCount: number;
  }>;
}

const statusLabel: Record<AppointmentStatus, string> = {
  PENDING: "Lịch cũ chưa xử lý",
  CONFIRMED: "Đã xác nhận",
  NEEDS_RESCHEDULE: "Cần đổi lịch",
  COMPLETED: "Đã khám",
  CANCELLED: "Đã hủy",
};

export const AdminDashboardPage = () => {
  const query = useQuery({
    queryKey: ["appointment-statistics"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<StatisticsResponse>>("/statistics/appointments");
      return response.data.data;
    },
  });

  if (query.isLoading) return <div className="page-state">Đang tải thống kê...</div>;
  if (!query.data) return <div className="alert alert-error">Không thể tải dữ liệu thống kê.</div>;

  return (
    <section className="section-block page-topless">
      <div className="section-heading">
        <div>
          <span className="eyebrow">QUẢN TRỊ PHÒNG KHÁM</span>
          <h1>Tổng quan lịch hẹn</h1>
        </div>
        <span className="muted">{query.data.range.from} → {query.data.range.to}</span>
      </div>

      <div className="stats-grid">
        <article className="stat-card stat-card-main">
          <span>Tổng lịch hẹn</span>
          <strong>{query.data.totalAppointments}</strong>
          <small>Trong khoảng thống kê hiện tại</small>
        </article>
        {query.data.byStatus.map((item) => (
          <article className="stat-card" key={item.status}>
            <span>{statusLabel[item.status]}</span>
            <strong>{item.count}</strong>
          </article>
        ))}
      </div>

      <div className="two-column-panels">
        <section className="panel">
          <h2>Số lịch hẹn theo ngày</h2>
          <div className="bar-list">
            {query.data.byDay.map((item) => {
              const max = Math.max(...query.data.byDay.map((row) => row.count), 1);
              return (
                <div className="bar-row" key={item.date}>
                  <span>{item.date}</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: `${(item.count / max) * 100}%` }} /></div>
                  <strong>{item.count}</strong>
                </div>
              );
            })}
            {!query.data.byDay.length && <div className="empty-state compact">Chưa có dữ liệu.</div>}
          </div>
        </section>

        <section className="panel">
          <h2>Bác sĩ được đặt nhiều nhất</h2>
          <div className="ranking-list">
            {query.data.topDoctors.map((item, index) => (
              <div className="ranking-row" key={item.doctor.id}>
                <span className="rank-number">{index + 1}</span>
                <div>
                  <strong>{item.doctor.fullName}</strong>
                  <span>{item.doctor.specialty.name}</span>
                </div>
                <strong>{item.appointmentCount} lịch</strong>
              </div>
            ))}
            {!query.data.topDoctors.length && <div className="empty-state compact">Chưa có dữ liệu.</div>}
          </div>
        </section>
      </div>
    </section>
  );
};
