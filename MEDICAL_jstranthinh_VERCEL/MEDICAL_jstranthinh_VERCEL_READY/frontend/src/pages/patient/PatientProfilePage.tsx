import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useAuth } from "../../auth/AuthContext";
import { api, getApiErrorMessage } from "../../lib/api";
import type { ApiResponse, PatientProfile } from "../../types/api";

export const PatientProfilePage = () => {
  const { refreshUser } = useAuth();
  const queryClient = useQueryClient();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const query = useQuery({
    queryKey: ["patient-profile"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PatientProfile>>("/patients/me");
      return response.data.data;
    },
  });

  useEffect(() => {
    if (query.data) {
      setFullName(query.data.fullName);
      setPhone(query.data.phone);
      setDateOfBirth(query.data.dateOfBirth?.slice(0, 10) ?? "");
    }
  }, [query.data]);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.patch<ApiResponse<PatientProfile>>("/patients/me", {
        fullName,
        phone,
        dateOfBirth: dateOfBirth || null,
      });
      return response.data.data;
    },
    onSuccess: async () => {
      setError("");
      setMessage("Cập nhật hồ sơ thành công.");
      await queryClient.invalidateQueries({ queryKey: ["patient-profile"] });
      await refreshUser();
    },
    onError: (err) => {
      setMessage("");
      setError(getApiErrorMessage(err));
    },
  });

  if (query.isLoading) return <div className="page-state">Đang tải hồ sơ...</div>;

  return (
    <section className="narrow-page">
      <span className="eyebrow">HỒ SƠ CÁ NHÂN</span>
      <h1>Thông tin bệnh nhân</h1>
      <p className="muted">Thông tin này giúp phòng khám liên hệ và chuẩn bị lịch hẹn.</p>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}
      <div className="panel form-stack">
        <label>
          <span>Họ và tên</span>
          <input className="input" value={fullName} onChange={(event) => setFullName(event.target.value)} />
        </label>
        <label>
          <span>Số điện thoại</span>
          <input className="input" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <label>
          <span>Ngày sinh</span>
          <input className="input" type="date" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />
        </label>
        <button className="button button-primary" disabled={mutation.isPending} onClick={() => mutation.mutate()} type="button">
          {mutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </section>
  );
};
