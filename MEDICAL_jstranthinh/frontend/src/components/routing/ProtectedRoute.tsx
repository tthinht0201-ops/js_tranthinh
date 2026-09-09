import { Navigate, Outlet, useLocation } from "react-router";

import { ROUTES } from "../../app/routes";
import { useAuth } from "../../auth/AuthContext";
import type { UserRole } from "../../types/api";

export const ProtectedRoute = ({ roles }: { roles?: UserRole[] }) => {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <div className="page-state">Đang kiểm tra phiên đăng nhập...</div>;
  }

  if (!user) {
    return (
      <Navigate
        to={ROUTES.login}
        state={{ from: `${location.pathname}${location.search}` }}
        replace
      />
    );
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={ROUTES.forbidden} replace />;
  }

  return <Outlet />;
};
