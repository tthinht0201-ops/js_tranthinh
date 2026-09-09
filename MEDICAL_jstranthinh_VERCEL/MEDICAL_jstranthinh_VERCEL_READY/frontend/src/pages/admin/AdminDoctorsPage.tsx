import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { api, getApiErrorMessage } from "../../lib/api";
import type { ApiResponse, Doctor, Specialty } from "../../types/api";

interface AdminDoctor extends Doctor {
  phone: string | null;
  user: { id: string; email: string; isActive: boolean };
  specialty: Doctor["specialty"] & { isActive?: boolean };
}

interface DoctorFormState {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  specialtyId: string;
  experienceYears: number;
  bio: string;
  avatarUrl: string;
}

const emptyForm: DoctorFormState = {
  email: "",
  password: "",
  fullName: "",
  phone: "",
  specialtyId: "",
  experienceYears: 0,
  bio: "",
  avatarUrl: "",
};

export const AdminDoctorsPage = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<AdminDoctor | null>(null);
  const [form, setForm] = useState<DoctorFormState>(emptyForm);
  const [error, setError] = useState("");

  const doctorsQuery = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<AdminDoctor[]>>("/doctors/admin/all");
      return response.data.data;
    },
  });

  const specialtiesQuery = useQuery({
    queryKey: ["specialties"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Specialty[]>>("/specialties");
      return response.data.data;
    },
  });

  useEffect(() => {
    if (selected) {
      setForm({
        email: selected.user.email,
        password: "",
        fullName: selected.fullName,
        phone: selected.phone ?? "",
        specialtyId: selected.specialty.id,
        experienceYears: selected.experienceYears,
        bio: selected.bio ?? "",
        avatarUrl: selected.avatarUrl ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [selected]);

  const updateField = <K extends keyof DoctorFormState>(key: K, value: DoctorFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (selected) {
        await api.patch(`/doctors/${selected.id}`, {
          email: form.email,
          fullName: form.fullName,
          phone: form.phone.trim() || null,
          specialtyId: form.specialtyId,
          experienceYears: form.experienceYears,
          bio: form.bio.trim() || null,
          avatarUrl: form.avatarUrl.trim() || null,
        });
      } else {
        await api.post("/doctors", {
          email: form.email,
          password: form.password,
          fullName: form.fullName,
          phone: form.phone.trim() || null,
          specialtyId: form.specialtyId,
          experienceYears: form.experienceYears,
          bio: form.bio.trim() || null,
          avatarUrl: form.avatarUrl.trim() || null,
        });
      }
    },
    onSuccess: async () => {
      setError("");
      setSelected(null);
      setForm(emptyForm);
      await queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  const deactivateMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/doctors/${id}`),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["doctors"] }),
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  return (
    <section className="section-block page-topless">
      <div className="section-heading"><div><span className="eyebrow">NHÂN SỰ BÁC SĨ</span><h1>Quản lý bác sĩ</h1></div></div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="admin-split admin-split-doctor">
        <section className="panel">
          <h2>{selected ? "Cập nhật bác sĩ" : "Thêm bác sĩ mới"}</h2>
          <div className="form-grid">
<label className="field-span-2"><span>Email đăng nhập</span><input className="input" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} /></label>
            {!selected && <label className="field-span-2"><span>Mật khẩu ban đầu</span><input className="input" type="password" value={form.password} onChange={(event) => updateField("password", event.target.value)} /></label>}
            <label className="field-span-2"><span>Họ tên bác sĩ</span><input className="input" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} /></label>
            <label><span>Số điện thoại</span><input className="input" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} /></label>
            <label><span>Kinh nghiệm (năm)</span><input className="input" type="number" min={0} max={80} value={form.experienceYears} onChange={(event) => updateField("experienceYears", Number(event.target.value))} /></label>
            <label className="field-span-2"><span>Chuyên khoa</span><select className="input" value={form.specialtyId} onChange={(event) => updateField("specialtyId", event.target.value)}><option value="">Chọn chuyên khoa</option>{specialtiesQuery.data?.map((specialty) => <option key={specialty.id} value={specialty.id}>{specialty.name}</option>)}</select></label>
            <label className="field-span-2"><span>Giới thiệu</span><textarea className="input textarea" rows={4} value={form.bio} onChange={(event) => updateField("bio", event.target.value)} /></label>
            <label className="field-span-2"><span>URL ảnh đại diện (không bắt buộc)</span><input className="input" value={form.avatarUrl} onChange={(event) => updateField("avatarUrl", event.target.value)} /></label>
            <div className="field-span-2 inline-actions">
              <button className="button button-primary" disabled={saveMutation.isPending || !form.email || !form.fullName.trim() || !form.specialtyId || (!selected && form.password.length < 8)} onClick={() => saveMutation.mutate()} type="button">{selected ? "Lưu thay đổi" : "Tạo bác sĩ"}</button>
              {selected && <button className="button button-ghost" onClick={() => setSelected(null)} type="button">Hủy sửa</button>}
            </div>
          </div>
        </section>

        <section className="panel">
          <h2>Danh sách bác sĩ đang hoạt động</h2>
          <div className="stack-list">
            {doctorsQuery.data?.map((doctor) => (
              <div className="stack-row stack-row-top" key={doctor.id}>
                <div>
                  <strong>{doctor.fullName}</strong>
                  <span>{doctor.specialty.name} · {doctor.experienceYears} năm kinh nghiệm · {doctor.user.email}</span>
                  <small>{doctor.user.isActive ? "Đang hoạt động" : "Đã ngừng hoạt động"} · {doctor.bio || "Chưa có giới thiệu"}</small>
                </div>
                <div className="inline-actions">
                  <button className="button button-soft button-small" onClick={() => setSelected(doctor)} type="button">Sửa</button>
                  {doctor.user.isActive ? <button className="button button-danger button-small" onClick={() => deactivateMutation.mutate(doctor.id)} type="button">Ngừng hoạt động</button> : <button className="button button-primary button-small" onClick={async () => { await api.patch(`/doctors/${doctor.id}`, { isActive: true }); await queryClient.invalidateQueries({ queryKey: ["doctors"] }); }} type="button">Kích hoạt</button>}
                </div>
              </div>
            ))}
            {!doctorsQuery.data?.length && <div className="empty-state compact">Chưa có bác sĩ.</div>}
          </div>
        </section>
      </div>
    </section>
  );
};
