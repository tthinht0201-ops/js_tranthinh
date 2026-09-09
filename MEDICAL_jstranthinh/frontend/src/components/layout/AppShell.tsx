import { NavLink, Outlet } from "react-router";

import { ROUTES } from "../../app/routes";
import { useAuth } from "../../auth/AuthContext";

const roleLabel = {
  PATIENT: "Bệnh nhân",
  DOCTOR: "Bác sĩ",
  ADMIN: "Quản trị",
  RECEPTIONIST: "Lễ tân",
} as const;

export const AppShell = () => {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to={ROUTES.home}>
          <span className="brand-mark">M+</span>
          <span>
            <strong>Medical Booking</strong>
            <small>Đặt lịch khám trực tuyến</small>
          </span>
        </NavLink>

        <nav className="main-nav" aria-label="Điều hướng chính">
          <NavLink to={ROUTES.home}>Bác sĩ</NavLink>

          {user?.role === "PATIENT" && (
            <>
              <NavLink to={ROUTES.patientAppointments}>Lịch của tôi</NavLink>
              <NavLink to={ROUTES.patientAi}>Gợi ý chuyên khoa</NavLink>
              <NavLink to={ROUTES.patientProfile}>Hồ sơ</NavLink>
            </>
          )}

          {user?.role === "DOCTOR" && (
            <>
              <NavLink to={ROUTES.doctorDashboard}>Lịch khám</NavLink>
              <NavLink to={ROUTES.doctorSchedule}>Lịch làm việc</NavLink>
            </>
          )}

          {(user?.role === "ADMIN" || user?.role === "RECEPTIONIST") && (
            <>
              <NavLink to={ROUTES.adminDashboard}>Tổng quan</NavLink>
              <NavLink to={ROUTES.adminAppointments}>Lịch hẹn</NavLink>
              <NavLink to={ROUTES.adminDoctors}>Bác sĩ</NavLink>
              <NavLink to={ROUTES.adminSpecialties}>Chuyên khoa</NavLink>
            </>
          )}
        </nav>

        <div className="account-actions">
          {user ? (
            <>
              <div className="account-chip">
                <strong>
                  {user.patientProfile?.fullName ??
                    user.doctorProfile?.fullName ??
                    user.email}
                </strong>
                <span>{roleLabel[user.role]}</span>
              </div>
              <button className="button button-ghost" type="button" onClick={logout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <NavLink className="button button-ghost" to={ROUTES.login}>
                Đăng nhập
              </NavLink>
              <NavLink className="button button-primary" to={ROUTES.register}>
                Đăng ký
              </NavLink>
            </>
          )}
        </div>
      </header>

      <main className="page-container">
        <Outlet />
      </main>

      <footer className="footer">
        <div>
          <strong>Medical Booking</strong>
          <p>Nền tảng hỗ trợ đặt lịch khám cho phòng khám tư nhân.</p>
        </div>
        <p>
          Thông tin trên hệ thống không thay thế tư vấn, chẩn đoán hoặc xử trí y khoa trực tiếp.
        </p>
      </footer>
    </div>
  );
};
