import { Navigate, Route, Routes } from "react-router";

import { AppShell } from "../components/layout/AppShell";
import { ProtectedRoute } from "../components/routing/ProtectedRoute";
import { AdminAppointmentsPage } from "../pages/admin/AdminAppointmentsPage";
import { AdminDashboardPage } from "../pages/admin/AdminDashboardPage";
import { AdminDoctorsPage } from "../pages/admin/AdminDoctorsPage";
import { AdminSpecialtiesPage } from "../pages/admin/AdminSpecialtiesPage";
import { DoctorDashboardPage } from "../pages/doctor/DoctorDashboardPage";
import { DoctorSchedulePage } from "../pages/doctor/DoctorSchedulePage";
import { AiSuggestionPage } from "../pages/patient/AiSuggestionPage";
import { PatientAppointmentsPage } from "../pages/patient/PatientAppointmentsPage";
import { PatientProfilePage } from "../pages/patient/PatientProfilePage";
import { DoctorDetailPage } from "../pages/public/DoctorDetailPage";
import { HomePage } from "../pages/public/HomePage";
import { LoginPage } from "../pages/public/LoginPage";
import { RegisterPage } from "../pages/public/RegisterPage";
import { ForbiddenPage } from "../pages/system/ForbiddenPage";
import { NotFoundPage } from "../pages/system/NotFoundPage";
import { ROUTES } from "./routes";

const App = () => (
  <Routes>
    <Route element={<AppShell />}>
      <Route index element={<HomePage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.register} element={<RegisterPage />} />
      <Route path="/doctors/:id" element={<DoctorDetailPage />} />
      <Route path={ROUTES.forbidden} element={<ForbiddenPage />} />

      <Route element={<ProtectedRoute roles={["PATIENT"]} />}>
        <Route path={ROUTES.patientAppointments} element={<PatientAppointmentsPage />} />
        <Route path={ROUTES.patientProfile} element={<PatientProfilePage />} />
        <Route path={ROUTES.patientAi} element={<AiSuggestionPage />} />
      </Route>

      <Route element={<ProtectedRoute roles={["DOCTOR"]} />}>
        <Route path={ROUTES.doctorDashboard} element={<DoctorDashboardPage />} />
        <Route path={ROUTES.doctorSchedule} element={<DoctorSchedulePage />} />
      </Route>

      <Route element={<ProtectedRoute roles={["ADMIN", "RECEPTIONIST"]} />}>
        <Route path={ROUTES.adminDashboard} element={<AdminDashboardPage />} />
        <Route path={ROUTES.adminAppointments} element={<AdminAppointmentsPage />} />
        <Route path={ROUTES.adminDoctors} element={<AdminDoctorsPage />} />
        <Route path={ROUTES.adminSpecialties} element={<AdminSpecialtiesPage />} />
      </Route>

      {/* Backward-compatible redirects for URLs used in earlier test builds. */}
      <Route path="/my-appointments" element={<Navigate to={ROUTES.patientAppointments} replace />} />
      <Route path="/profile" element={<Navigate to={ROUTES.patientProfile} replace />} />
      <Route path="/ai" element={<Navigate to={ROUTES.patientAi} replace />} />
      <Route path="/doctor" element={<Navigate to={ROUTES.doctorDashboard} replace />} />
      <Route path="/admin" element={<Navigate to={ROUTES.adminDashboard} replace />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
