import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { api, getApiErrorMessage } from "../../lib/api";
import type { ApiResponse, Specialty } from "../../types/api";

export const AdminSpecialtiesPage = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Specialty | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const query = useQuery({
    queryKey: ["specialties"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Specialty[]>>("/specialties");
      return response.data.data;
    },
  });

  useEffect(() => {
    if (selected) {
      setName(selected.name);
      setDescription(selected.description ?? "");
    } else {
      setName("");
      setDescription("");
    }
  }, [selected]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (selected) {
        await api.patch(`/specialties/${selected.id}`, { name, description: description || null });
      } else {
        await api.post("/specialties", { name, description: description || null });
      }
    },
    onSuccess: async () => {
      setError("");
      setSelected(null);
      setName("");
      setDescription("");
      await queryClient.invalidateQueries({ queryKey: ["specialties"] });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/specialties/${id}`),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["specialties"] }),
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  return (
    <section className="section-block page-topless">
      <div className="section-heading"><div><span className="eyebrow">DANH MỤC</span><h1>Quản lý chuyên khoa</h1></div></div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="admin-split">
        <section className="panel">
          <h2>{selected ? "Cập nhật chuyên khoa" : "Thêm chuyên khoa"}</h2>
          <div className="form-stack">
            <label><span>Tên chuyên khoa</span><input className="input" value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label><span>Mô tả</span><textarea className="input textarea" rows={5} value={description} onChange={(event) => setDescription(event.target.value)} /></label>
            <div className="inline-actions">
              <button className="button button-primary" disabled={saveMutation.isPending || name.trim().length < 2} onClick={() => saveMutation.mutate()} type="button">{selected ? "Lưu thay đổi" : "Thêm chuyên khoa"}</button>
              {selected && <button className="button button-ghost" onClick={() => setSelected(null)} type="button">Hủy sửa</button>}
            </div>
          </div>
        </section>
        <section className="panel">
          <h2>Danh sách đang hoạt động</h2>
          <div className="stack-list">
            {query.data?.map((specialty) => (
              <div className="stack-row stack-row-top" key={specialty.id}>
                <div><strong>{specialty.name}</strong><span>{specialty.description || "Chưa có mô tả"}</span><small>{specialty._count?.doctors ?? 0} bác sĩ</small></div>
                <div className="inline-actions"><button className="button button-soft button-small" onClick={() => setSelected(specialty)} type="button">Sửa</button><button className="button button-danger button-small" onClick={() => deleteMutation.mutate(specialty.id)} type="button">Ngừng dùng</button></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};
