import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";

import { ROUTES, doctorDetailPath } from "../../app/routes";
import { api } from "../../lib/api";
import type { ApiResponse, Doctor, Specialty } from "../../types/api";

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [specialtyId, setSpecialtyId] = useState(searchParams.get("specialty") ?? "");

  const specialtiesQuery = useQuery({
    queryKey: ["specialties"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Specialty[]>>("/specialties");
      return response.data.data;
    },
  });

  const doctorsQuery = useQuery({
    queryKey: ["doctors", q, specialtyId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Doctor[]>>("/doctors", {
        params: {
          ...(q.trim() && { q: q.trim() }),
          ...(specialtyId && { specialtyId }),
        },
      });
      return response.data.data;
    },
  });

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">ĐẶT LỊCH KHÁM NHANH & MINH BẠCH</span>
          <h1>Tìm bác sĩ phù hợp và chủ động chọn giờ khám</h1>
          <p>
            Tra cứu bác sĩ theo chuyên khoa, xem lịch trống theo ngày và đặt lịch trực tuyến chỉ trong vài bước.
          </p>
          <div className="hero-actions">
            <a className="button button-primary button-lg" href="#doctor-list">Tìm bác sĩ</a>
            <Link className="button button-soft button-lg" to={ROUTES.patientAi}>Chưa biết chọn chuyên khoa?</Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="metric-card">
            <strong>01</strong>
            <span>Chọn chuyên khoa</span>
          </div>
          <div className="metric-card">
            <strong>02</strong>
            <span>Chọn bác sĩ & khung giờ</span>
          </div>
          <div className="metric-card">
            <strong>03</strong>
            <span>Nhận xác nhận ngay</span>
          </div>
        </div>
      </section>

      <section id="doctor-list" className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DANH SÁCH BÁC SĨ</span>
            <h2>Chọn bác sĩ theo nhu cầu</h2>
          </div>
          <span className="muted">{doctorsQuery.data?.length ?? 0} bác sĩ đang hoạt động</span>
        </div>

        <div className="filter-bar">
          <input
            className="input"
            placeholder="Tìm theo tên bác sĩ..."
            value={q}
            onChange={(event) => setQ(event.target.value)}
          />
          <select className="input" value={specialtyId} onChange={(event) => setSpecialtyId(event.target.value)}>
            <option value="">Tất cả chuyên khoa</option>
            {specialtiesQuery.data?.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
            ))}
          </select>
        </div>

        {doctorsQuery.isLoading ? (
          <div className="page-state">Đang tải danh sách bác sĩ...</div>
        ) : doctorsQuery.isError ? (
          <div className="alert alert-error">Không thể tải danh sách bác sĩ.</div>
        ) : doctorsQuery.data?.length ? (
          <div className="doctor-grid">
            {doctorsQuery.data.map((doctor) => (
              <article className="doctor-card" key={doctor.id}>
                <div className="doctor-avatar">
                  {doctor.avatarUrl ? <img src={doctor.avatarUrl} alt={doctor.fullName} /> : <span>{doctor.fullName.slice(0, 1)}</span>}
                </div>
                <div className="doctor-card-body">
                  <span className="tag">{doctor.specialty.name}</span>
                  <h3>{doctor.fullName}</h3>
                  <p>{doctor.experienceYears} năm kinh nghiệm</p>
                  <p className="doctor-bio">{doctor.bio || "Bác sĩ đang cập nhật thông tin giới thiệu."}</p>
                  <Link className="button button-primary button-full" to={doctorDetailPath(doctor.id)}>
                    Xem lịch trống
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">Không tìm thấy bác sĩ phù hợp với bộ lọc hiện tại.</div>
        )}
      </section>
    </>
  );
};
