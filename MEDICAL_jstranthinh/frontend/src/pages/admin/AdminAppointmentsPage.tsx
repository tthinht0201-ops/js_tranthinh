import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";

import { api, getApiErrorMessage } from "../../lib/api";
import type {
  ApiResponse,
  Appointment,
  AppointmentStatus,
  CancellationSource,
  Doctor,
} from "../../types/api";

const statusLabel: Record<AppointmentStatus, string> = {
  PENDING: "Lịch cũ chưa xử lý",
  CONFIRMED: "Đã xác nhận",
  NEEDS_RESCHEDULE: "Cần đổi lịch",
  COMPLETED: "Đã khám",
  CANCELLED: "Đã hủy",
};

type StaffCancellationSource = Exclude<CancellationSource, "PATIENT">;

export const AdminAppointmentsPage = () => {
  const queryClient = useQueryClient();

  const [date, setDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [status, setStatus] = useState<"" | AppointmentStatus>("");
  const [error, setError] = useState("");

  const [rescheduleAppointmentId, setRescheduleAppointmentId] =
    useState("");

  const [rescheduleStart, setRescheduleStart] = useState("");

  /*
   * ============================================================
   * LOAD DOCTORS
   * ============================================================
   */

  const doctorsQuery = useQuery({
    queryKey: ["doctors"],

    queryFn: async () => {
      const response =
        await api.get<ApiResponse<Doctor[]>>("/doctors");

      return response.data.data;
    },
  });

  /*
   * ============================================================
   * LOAD APPOINTMENTS
   * ============================================================
   */

  const query = useQuery({
    queryKey: [
      "admin-appointments",
      date,
      doctorId,
      status,
    ],

    queryFn: async () => {
      const response =
        await api.get<ApiResponse<Appointment[]>>(
          "/appointments",
          {
            params: {
              ...(date && { date }),
              ...(doctorId && { doctorId }),
              ...(status && { status }),
            },
          },
        );

      return response.data.data;
    },
  });

  /*
   * ============================================================
   * CONFIRM / CANCEL APPOINTMENT
   * ============================================================
   *
   * cancellationSource:
   *
   * ADMIN:
   * Admin/lễ tân chủ động hủy lịch.
   *
   * DOCTOR:
   * Admin/lễ tân là người thao tác hủy,
   * nhưng nguyên nhân thực tế đến từ bác sĩ.
   *
   */

  const statusMutation = useMutation({
    mutationFn: async ({
      id,
      nextStatus,
      cancellationSource,
      reason,
    }: {
      id: string;
      nextStatus: "CONFIRMED" | "CANCELLED";
      cancellationSource?: StaffCancellationSource;
      reason?: string;
    }) => {
      await api.patch(`/appointments/${id}/status`, {
        status: nextStatus,

        ...(nextStatus === "CANCELLED" && {
          cancellationSource:
            cancellationSource ?? "ADMIN",

          reason:
            cancellationSource === "DOCTOR"
              ? null
              : reason ??
                "Phòng khám/lễ tân hủy lịch.",
        }),
      });
    },

    onSuccess: async () => {
      setError("");

      await queryClient.invalidateQueries({
        queryKey: ["admin-appointments"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["appointment-statistics"],
      });
    },

    onError: (err) => {
      setError(getApiErrorMessage(err));
    },
  });

  /*
   * ============================================================
   * RESCHEDULE APPOINTMENT
   * ============================================================
   *
   * Dùng khi bác sĩ tạo BlockedTime đè lên
   * appointment đã được xác nhận (hoặc dữ liệu PENDING cũ).
   *
   * Appointment lúc này có trạng thái:
   *
   * NEEDS_RESCHEDULE
   *
   * Sau khi Admin/lễ tân liên hệ bệnh nhân
   * và chọn thời gian mới:
   *
   * NEEDS_RESCHEDULE -> CONFIRMED
   *
   */

  const rescheduleMutation = useMutation({
    mutationFn: async ({
      id,
      startAt,
    }: {
      id: string;
      startAt: string;
    }) => {
      /*
       * datetime-local trả về giờ local của browser.
       *
       * new Date(...).toISOString()
       * chuyển sang UTC trước khi gửi backend.
       */
      const newStartAt = new Date(startAt);

      if (Number.isNaN(newStartAt.getTime())) {
        throw new Error("Thời gian đổi lịch không hợp lệ");
      }

      await api.patch(
        `/appointments/${id}/reschedule`,
        {
          startAt: newStartAt.toISOString(),
        },
      );
    },

    onSuccess: async () => {
      setError("");

      setRescheduleAppointmentId("");
      setRescheduleStart("");

      await queryClient.invalidateQueries({
        queryKey: ["admin-appointments"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["appointment-statistics"],
      });

      /*
       * Slot mới / slot cũ có thể đã thay đổi.
       * Invalidate các query liên quan đến available slots.
       */
      await queryClient.invalidateQueries({
        queryKey: ["available-slots"],
      });
    },

    onError: (err) => {
      setError(getApiErrorMessage(err));
    },
  });

  /*
   * ============================================================
   * OPEN RESCHEDULE FORM
   * ============================================================
   */

  const openRescheduleForm = (
    appointment: Appointment,
  ) => {
    setError("");

    setRescheduleAppointmentId(
      appointment.id,
    );

    /*
     * Có thể để trống để Admin chủ động chọn.
     *
     * Không sử dụng thời gian cũ vì thời gian
     * đó đang bị BlockedTime của bác sĩ chặn.
     */
    setRescheduleStart("");
  };

  /*
   * ============================================================
   * CLOSE RESCHEDULE FORM
   * ============================================================
   */

  const closeRescheduleForm = () => {
    setRescheduleAppointmentId("");
    setRescheduleStart("");
  };

  /*
   * ============================================================
   * CANCELLATION DESCRIPTION
   * ============================================================
   */

  const getCancellationDescription = (
    appointment: Appointment,
  ) => {
    if (appointment.cancellationSource === "DOCTOR") {
      return "Hủy do bác sĩ có việc đột xuất.";
    }

    if (appointment.cancellationSource === "ADMIN") {
      return appointment.cancellationReason
        ? `Hủy bởi phòng khám/lễ tân: ${appointment.cancellationReason}`
        : "Hủy bởi phòng khám/lễ tân.";
    }

    if (appointment.cancellationSource === "PATIENT") {
      return appointment.cancellationReason
        ? `Bệnh nhân hủy: ${appointment.cancellationReason}`
        : "Bệnh nhân chủ động hủy.";
    }

    return appointment.cancellationReason
      ? `Lý do: ${appointment.cancellationReason}`
      : "";
  };

  return (
    <section className="section-block page-topless">
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="section-heading">
        <div>
          <span className="eyebrow">
            LỄ TÂN / QUẢN TRỊ
          </span>

          <h1>Toàn bộ lịch hẹn</h1>
        </div>
      </div>

      {/* ===================================================== */}
      {/* FILTER */}
      {/* ===================================================== */}

      <div className="filter-bar filter-bar-3">
        <input
          className="input"
          type="date"
          value={date}
          onChange={(event) =>
            setDate(event.target.value)
          }
        />

        <select
          className="input"
          value={doctorId}
          onChange={(event) =>
            setDoctorId(event.target.value)
          }
        >
          <option value="">
            Tất cả bác sĩ
          </option>

          {doctorsQuery.data?.map(
            (doctor) => (
              <option
                key={doctor.id}
                value={doctor.id}
              >
                {doctor.fullName}
              </option>
            ),
          )}
        </select>

        <select
          className="input"
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as
                | ""
                | AppointmentStatus,
            )
          }
        >
          <option value="">
            Tất cả trạng thái
          </option>

          {Object.entries(statusLabel).map(
            ([key, label]) => (
              <option
                key={key}
                value={key}
              >
                {label}
              </option>
            ),
          )}
        </select>
      </div>

      {/* ===================================================== */}
      {/* ERROR */}
      {/* ===================================================== */}

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {/* ===================================================== */}
      {/* LOADING */}
      {/* ===================================================== */}

      {query.isLoading ? (
        <div className="page-state">
          Đang tải lịch hẹn...
        </div>
      ) : (
        /*
         * =====================================================
         * APPOINTMENT TABLE
         * =====================================================
         */
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Bệnh nhân</th>
                <th>Bác sĩ</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {query.data?.map(
                (appointment) => (
                  <tr key={appointment.id}>
                    {/* ======================================= */}
                    {/* TIME */}
                    {/* ======================================= */}

                    <td>
                      <strong>
                        {format(
                          new Date(
                            appointment.startAt,
                          ),
                          "dd/MM/yyyy",
                        )}
                      </strong>

                      <br />

                      {format(
                        new Date(
                          appointment.startAt,
                        ),
                        "HH:mm",
                      )}

                      {" – "}

                      {format(
                        new Date(
                          appointment.endAt,
                        ),
                        "HH:mm",
                      )}
                    </td>

                    {/* ======================================= */}
                    {/* PATIENT */}
                    {/* ======================================= */}

                    <td>
                      {
                        appointment.patient
                          .fullName
                      }

                      <br />

                      <span className="muted">
                        {
                          appointment.patient
                            .phone
                        }
                      </span>
                    </td>

                    {/* ======================================= */}
                    {/* DOCTOR */}
                    {/* ======================================= */}

                    <td>
                      {
                        appointment.doctor
                          .fullName
                      }

                      <br />

                      <span className="muted">
                        {
                          appointment.doctor
                            .specialty.name
                        }
                      </span>
                    </td>

                    {/* ======================================= */}
                    {/* STATUS */}
                    {/* ======================================= */}

                    <td>
                      <span
                        className={`status status-${appointment.status.toLowerCase()}`}
                      >
                        {
                          statusLabel[
                            appointment.status
                          ]
                        }
                      </span>

                      {/* Bác sĩ tạo BlockedTime */}

                      {appointment.status ===
                        "NEEDS_RESCHEDULE" && (
                        <div
                          className="muted"
                          style={{
                            marginTop: 8,
                            maxWidth: 260,
                          }}
                        >
                          <strong>
                            Bác sĩ thay đổi lịch
                          </strong>

                          <br />

                          {appointment.rescheduleReason ??
                            "Bác sĩ có việc đột xuất. Cần liên hệ bệnh nhân để đổi hoặc hủy lịch."}
                        </div>
                      )}

                      {/* Appointment đã bị hủy */}

                      {appointment.status ===
                        "CANCELLED" && (
                        <div
                          className="muted"
                          style={{
                            marginTop: 8,
                            maxWidth: 260,
                          }}
                        >
                          {getCancellationDescription(
                            appointment,
                          )}
                        </div>
                      )}
                    </td>

                    {/* ======================================= */}
                    {/* ACTIONS */}
                    {/* ======================================= */}

                    <td className="table-actions">
                      {/* ------------------------------------- */}
                      {/* PENDING */}
                      {/* ------------------------------------- */}

                      {appointment.status ===
                        "PENDING" && (
                        <>
                          <span className="muted">
                            Dữ liệu cũ. Lịch mới hiện được xác nhận tự động.
                          </span>
                          <button
                            className="button button-danger button-small"
                            disabled={statusMutation.isPending}
                            onClick={() =>
                              statusMutation.mutate({
                                id: appointment.id,
                                nextStatus: "CANCELLED",
                                cancellationSource: "ADMIN",
                                reason: "Phòng khám/lễ tân hủy lịch.",
                              })
                            }
                            type="button"
                          >
                            Hủy
                          </button>
                        </>
                      )}

                      {/* ------------------------------------- */}
                      {/* CONFIRMED */}
                      {/* ------------------------------------- */}

                      {appointment.status ===
                        "CONFIRMED" && (
                        <button
                          className="button button-danger button-small"
                          disabled={
                            statusMutation.isPending
                          }
                          onClick={() =>
                            statusMutation.mutate(
                              {
                                id: appointment.id,
                                nextStatus:
                                  "CANCELLED",

                                /*
                                 * Appointment vẫn bình thường.
                                 *
                                 * Nếu Admin chủ động hủy thì
                                 * nguồn nguyên nhân là ADMIN.
                                 */
                                cancellationSource:
                                  "ADMIN",

                                reason:
                                  "Phòng khám/lễ tân hủy lịch.",
                              },
                            )
                          }
                          type="button"
                        >
                          Hủy
                        </button>
                      )}

                      {/* ------------------------------------- */}
                      {/* NEEDS_RESCHEDULE */}
                      {/* ------------------------------------- */}

                      {appointment.status ===
                        "NEEDS_RESCHEDULE" && (
                        <>
                          <button
                            className="button button-primary button-small"
                            type="button"
                            onClick={() =>
                              openRescheduleForm(
                                appointment,
                              )
                            }
                          >
                            Đổi lịch
                          </button>

                          <button
                            className="button button-danger button-small"
                            disabled={
                              statusMutation.isPending
                            }
                            type="button"
                            onClick={() =>
                              statusMutation.mutate(
                                {
                                  id: appointment.id,

                                  nextStatus:
                                    "CANCELLED",

                                  /*
                                   * QUAN TRỌNG:
                                   *
                                   * Người thao tác:
                                   * Admin / Receptionist
                                   *
                                   * Nhưng nguyên nhân:
                                   * Doctor
                                   */
                                  cancellationSource:
                                    "DOCTOR",
                                },
                              )
                            }
                          >
                            Hủy do bác sĩ bận
                          </button>

                          {/* ================================= */}
                          {/* RESCHEDULE FORM */}
                          {/* ================================= */}

                          {rescheduleAppointmentId ===
                            appointment.id && (
                            <div
                              className="inline-fields"
                              style={{
                                width: "100%",
                                marginTop: 8,
                              }}
                            >
                              <input
                                aria-label="Thời gian khám mới"
                                className="input"
                                type="datetime-local"
                                value={
                                  rescheduleStart
                                }
                                onChange={(
                                  event,
                                ) =>
                                  setRescheduleStart(
                                    event.target
                                      .value,
                                  )
                                }
                              />

                              <button
                                className="button button-primary button-small"
                                disabled={
                                  !rescheduleStart ||
                                  rescheduleMutation.isPending
                                }
                                onClick={() =>
                                  rescheduleMutation.mutate(
                                    {
                                      id: appointment.id,
                                      startAt:
                                        rescheduleStart,
                                    },
                                  )
                                }
                                type="button"
                              >
                                {rescheduleMutation.isPending
                                  ? "Đang đổi..."
                                  : "Xác nhận giờ mới"}
                              </button>

                              <button
                                className="button button-soft button-small"
                                disabled={
                                  rescheduleMutation.isPending
                                }
                                onClick={
                                  closeRescheduleForm
                                }
                                type="button"
                              >
                                Đóng
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ),
              )}

              {/* ============================================= */}
              {/* EMPTY */}
              {/* ============================================= */}

              {!query.data?.length && (
                <tr>
                  <td colSpan={5}>
                    <div className="empty-state compact">
                      Không có lịch hẹn phù
                      hợp.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};