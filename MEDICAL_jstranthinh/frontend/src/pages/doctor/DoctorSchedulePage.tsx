import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useMemo, useState } from "react";

import { api, getApiErrorMessage } from "../../lib/api";
import type {
  ApiResponse,
  BlockedTime,
  DayOfWeek,
  DoctorDateSchedule,
  DoctorSchedule,
} from "../../types/api";

const dayLabels: Record<DayOfWeek, string> = {
  MONDAY: "Thứ 2",
  TUESDAY: "Thứ 3",
  WEDNESDAY: "Thứ 4",
  THURSDAY: "Thứ 5",
  FRIDAY: "Thứ 6",
  SATURDAY: "Thứ 7",
  SUNDAY: "Chủ nhật",
};

const days = Object.keys(dayLabels) as DayOfWeek[];

const timeToMinute = (value: string) => {
  const [hour = "0", minute = "0"] = value.split(":");
  return Number(hour) * 60 + Number(minute);
};

const minuteToTime = (value: number) =>
  `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;

const formatWorkDate = (value: string) => {
  const date = value.slice(0, 10);
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const formatSelectedDate = (value: string) => {
  if (!value) {
    return "Chưa chọn ngày";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export const DoctorSchedulePage = () => {
  const queryClient = useQueryClient();
  const today = format(new Date(), "yyyy-MM-dd");

  // Lịch ngày cụ thể - đây là luồng chính.
  const [dateScheduleId, setDateScheduleId] = useState("");
  const [workDate, setWorkDate] = useState(today);
  const [dateStartTime, setDateStartTime] = useState("08:00");
  const [dateEndTime, setDateEndTime] = useState("17:00");
  const [dateSlotMinutes, setDateSlotMinutes] = useState(30);
  const [dateNote, setDateNote] = useState("");

  // Lịch tuần mặc định - chỉ là tùy chọn phụ.
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>("MONDAY");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [slotMinutes, setSlotMinutes] = useState(30);

  // Blocked time.
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [blockReason, setBlockReason] = useState("");

  const [error, setError] = useState("");

  const selectedDateLabel = useMemo(
    () => formatSelectedDate(workDate),
    [workDate],
  );

  const dateSchedulesQuery = useQuery({
    queryKey: ["my-date-schedules"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<DoctorDateSchedule[]>>(
        "/doctor-schedules/date-schedules/me",
      );
      return response.data.data;
    },
  });

  const schedulesQuery = useQuery({
    queryKey: ["my-schedules"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<DoctorSchedule[]>>(
        "/doctor-schedules/me",
      );
      return response.data.data;
    },
  });

  const blockedQuery = useQuery({
    queryKey: ["my-blocked-times"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<BlockedTime[]>>(
        "/doctor-schedules/blocked-times/me",
      );
      return response.data.data;
    },
  });

  const saveDateSchedule = useMutation({
    mutationFn: async () => {
      const payload = {
        date: workDate,
        startMinute: timeToMinute(dateStartTime),
        endMinute: timeToMinute(dateEndTime),
        slotMinutes: dateSlotMinutes,
        note: dateNote.trim() || null,
      };

      if (dateScheduleId) {
        await api.patch(
          `/doctor-schedules/date-schedules/me/${dateScheduleId}`,
          payload,
        );
        return;
      }

      await api.post("/doctor-schedules/date-schedules/me", payload);
    },
    onSuccess: async () => {
      setError("");
      setDateScheduleId("");
      setWorkDate(today);
      setDateStartTime("08:00");
      setDateEndTime("17:00");
      setDateSlotMinutes(30);
      setDateNote("");

      await queryClient.invalidateQueries({
        queryKey: ["my-date-schedules"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["available-slots"],
      });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  const deleteDateSchedule = useMutation({
    mutationFn: async (id: string) =>
      api.delete(`/doctor-schedules/date-schedules/me/${id}`),
    onSuccess: async () => {
      setError("");
      setDateScheduleId("");
      await queryClient.invalidateQueries({
        queryKey: ["my-date-schedules"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["available-slots"],
      });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  const createSchedule = useMutation({
    mutationFn: async () => {
      await api.post("/doctor-schedules/me", {
        dayOfWeek,
        startMinute: timeToMinute(startTime),
        endMinute: timeToMinute(endTime),
        slotMinutes,
      });
    },
    onSuccess: async () => {
      setError("");
      await queryClient.invalidateQueries({ queryKey: ["my-schedules"] });
      await queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  const deleteSchedule = useMutation({
    mutationFn: async (id: string) => api.delete(`/doctor-schedules/me/${id}`),
    onSuccess: async () => {
      setError("");
      await queryClient.invalidateQueries({ queryKey: ["my-schedules"] });
      await queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  const createBlocked = useMutation({
    mutationFn: async () => {
      await api.post("/doctor-schedules/blocked-times/me", {
        startAt: new Date(blockStart).toISOString(),
        endAt: new Date(blockEnd).toISOString(),
        reason: blockReason.trim() || null,
      });
    },
    onSuccess: async () => {
      setError("");
      setBlockStart("");
      setBlockEnd("");
      setBlockReason("");

      await queryClient.invalidateQueries({ queryKey: ["my-blocked-times"] });
      await queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  const deleteBlocked = useMutation({
    mutationFn: async (id: string) =>
      api.delete(`/doctor-schedules/blocked-times/me/${id}`),
    onSuccess: async () => {
      setError("");
      await queryClient.invalidateQueries({ queryKey: ["my-blocked-times"] });
      await queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  const startEditDateSchedule = (schedule: DoctorDateSchedule) => {
    setError("");
    setDateScheduleId(schedule.id);
    setWorkDate(schedule.workDate.slice(0, 10));
    setDateStartTime(minuteToTime(schedule.startMinute));
    setDateEndTime(minuteToTime(schedule.endMinute));
    setDateSlotMinutes(schedule.slotMinutes);
    setDateNote(schedule.note ?? "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditDateSchedule = () => {
    setDateScheduleId("");
    setWorkDate(today);
    setDateStartTime("08:00");
    setDateEndTime("17:00");
    setDateSlotMinutes(30);
    setDateNote("");
  };

  return (
    <section className="section-block page-topless">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THIẾT LẬP THỜI GIAN</span>
          <h1>Lịch làm việc của bác sĩ</h1>
          <p className="muted">
            Chọn trực tiếp ngày làm việc cụ thể. Lịch theo thứ trong tuần chỉ là
            tùy chọn nếu bác sĩ muốn tạo lịch lặp lại.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">LỊCH CHÍNH</span>
            <h2>Lịch làm việc cá nhân</h2>
            <p className="muted">
            </p>
          </div>
        </div>

        <div className="form-grid schedule-form">
          <label className="field-span-2">
            <span>Ngày làm việc </span>
            <input
              className="input"
              type="date"
              min={today}
              value={workDate}
              onChange={(event) => setWorkDate(event.target.value)}
            />
            <small className="muted">Đang chọn: {selectedDateLabel}</small>
          </label>

          <label>
            <span>Bắt đầu</span>
            <input
              className="input"
              type="time"
              value={dateStartTime}
              onChange={(event) => setDateStartTime(event.target.value)}
            />
          </label>

          <label>
            <span>Kết thúc</span>
            <input
              className="input"
              type="time"
              value={dateEndTime}
              onChange={(event) => setDateEndTime(event.target.value)}
            />
          </label>

          <label>
            <span>Thời gian mỗi lượt khám</span>
            <select
              className="input"
              value={dateSlotMinutes}
              onChange={(event) =>
                setDateSlotMinutes(Number(event.target.value))
              }
            >
              {[15, 20, 30, 45, 60].map((value) => (
                <option key={value} value={value}>
                  {value} phút
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Ghi chú</span>
            <input
              className="input"
              placeholder="Ví dụ: Ca sáng, khám tại phòng 02..."
              value={dateNote}
              onChange={(event) => setDateNote(event.target.value)}
            />
          </label>

          <div
            className="field-span-2"
            style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
          >
            <button
              className="button button-primary"
              disabled={
                saveDateSchedule.isPending ||
                !workDate ||
                !dateStartTime ||
                !dateEndTime
              }
              onClick={() => saveDateSchedule.mutate()}
              type="button"
            >
              {saveDateSchedule.isPending
                ? "Đang lưu..."
                : dateScheduleId
                  ? "Lưu thay đổi ngày này"
                  : "Thêm ngày làm việc"}
            </button>

            {dateScheduleId && (
              <button
                className="button button-soft"
                onClick={cancelEditDateSchedule}
                type="button"
              >
                Hủy chỉnh sửa
              </button>
            )}
          </div>
        </div>

        <div className="stack-list">
          {dateSchedulesQuery.data?.map((schedule) => (
            <div className="stack-row" key={schedule.id}>
              <div>
                <strong>{formatWorkDate(schedule.workDate)}</strong>
                <span>
                  {minuteToTime(schedule.startMinute)} –{" "}
                  {minuteToTime(schedule.endMinute)} · {schedule.slotMinutes}
                  phút/lượt
                </span>
                {schedule.note && <small>{schedule.note}</small>}
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  className="button button-soft button-small"
                  onClick={() => startEditDateSchedule(schedule)}
                  type="button"
                >
                  Sửa ngày này
                </button>
                <button
                  className="button button-danger button-small"
                  disabled={deleteDateSchedule.isPending}
                  onClick={() => deleteDateSchedule.mutate(schedule.id)}
                  type="button"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}

          {!dateSchedulesQuery.data?.length && (
            <div className="empty-state compact">
              Chưa có ngày làm việc cụ thể. Hãy chọn một ngày ở phía trên để
              bắt đầu.
            </div>
          )}
        </div>
      </section>

      <section className="panel" style={{ marginTop: 20 }}>
        <details>
          <summary style={{ cursor: "pointer", fontWeight: 700 }}>
            Lịch lặp theo tuần (tùy chọn)
          </summary>

          <p className="muted" style={{ marginTop: 12 }}>
            Lịch làm việc cố định mỗi tuần ( ưu tiên lịch làm việc cá nhân trước )
          </p>

          <div className="form-grid schedule-form">
            <label>
              <span>Ngày trong tuần</span>
              <select
                className="input"
                value={dayOfWeek}
                onChange={(event) =>
                  setDayOfWeek(event.target.value as DayOfWeek)
                }
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {dayLabels[day]}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Bắt đầu</span>
              <input
                className="input"
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
              />
            </label>

            <label>
              <span>Kết thúc</span>
              <input
                className="input"
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              />
            </label>

            <label>
              <span>Thời gian khám</span>
              <select
                className="input"
                value={slotMinutes}
                onChange={(event) => setSlotMinutes(Number(event.target.value))}
              >
                {[15, 20, 30, 45, 60].map((value) => (
                  <option key={value} value={value}>
                    {value} phút
                  </option>
                ))}
              </select>
            </label>

            <button
              className="button button-primary field-span-2"
              disabled={createSchedule.isPending}
              onClick={() => createSchedule.mutate()}
              type="button"
            >
              Thêm lịch lặp theo tuần
            </button>
          </div>

          <div className="stack-list">
            {schedulesQuery.data?.map((schedule) => (
              <div className="stack-row" key={schedule.id}>
                <div>
                  <strong>{dayLabels[schedule.dayOfWeek]}</strong>
                  <span>
                    {minuteToTime(schedule.startMinute)} –{" "}
                    {minuteToTime(schedule.endMinute)} · {schedule.slotMinutes}
                    phút/lượt
                  </span>
                </div>
                <button
                  className="button button-danger button-small"
                  disabled={deleteSchedule.isPending}
                  onClick={() => deleteSchedule.mutate(schedule.id)}
                  type="button"
                >
                  Xóa
                </button>
              </div>
            ))}

            {!schedulesQuery.data?.length && (
              <div className="empty-state compact">
                Chưa thiết lập lịch lặp theo tuần.
              </div>
            )}
          </div>
        </details>
      </section>

      <section className="panel" style={{ marginTop: 20 }}>
        <h2>Giờ nghỉ / bận đột xuất</h2>
        <p className="muted">
        </p>

        <div className="form-grid schedule-form">
          <label>
            <span>Từ ngày, giờ</span>
            <input
              className="input"
              type="datetime-local"
              value={blockStart}
              onChange={(event) => setBlockStart(event.target.value)}
            />
          </label>

          <label>
            <span>Đến ngày, giờ</span>
            <input
              className="input"
              type="datetime-local"
              value={blockEnd}
              onChange={(event) => setBlockEnd(event.target.value)}
            />
          </label>

          <label className="field-span-2">
            <span>Lý do nội bộ</span>
            <input
              className="input"
              placeholder="Nghỉ cá nhân, họp đột xuất..."
              value={blockReason}
              onChange={(event) => setBlockReason(event.target.value)}
            />
          </label>

          <button
            className="button button-primary field-span-2"
            disabled={createBlocked.isPending || !blockStart || !blockEnd}
            onClick={() => createBlocked.mutate()}
            type="button"
          >
            Chặn khung giờ ngay
          </button>
        </div>

        <div className="stack-list">
          {blockedQuery.data?.map((blocked) => (
            <div className="stack-row" key={blocked.id}>
              <div>
                <strong>
                  {format(new Date(blocked.startAt), "dd/MM/yyyy HH:mm")}
                </strong>
                <span>
                  đến {format(new Date(blocked.endAt), "dd/MM/yyyy HH:mm")} ·{" "}
                  {blocked.reason || "Không ghi lý do"}
                </span>
              </div>
              <button
                className="button button-danger button-small"
                disabled={deleteBlocked.isPending}
                onClick={() => deleteBlocked.mutate(blocked.id)}
                type="button"
              >
                Bỏ chặn
              </button>
            </div>
          ))}

          {!blockedQuery.data?.length && (
            <div className="empty-state compact">
              Chưa có khung giờ nào bị chặn.
            </div>
          )}
        </div>
      </section>
    </section>
  );
};
