import { Link } from "react-router";

import { ROUTES } from "../../app/routes";

export const ForbiddenPage = () => (
  <section className="system-page">
    <div className="system-card">
      <span className="eyebrow">403</span>
      <h1>Không có quyền truy cập</h1>
      <p className="muted">
        Tài khoản hiện tại không có quyền mở trang này. Vui lòng quay lại khu vực phù hợp với vai trò của bạn.
      </p>
      <Link className="button button-primary" to={ROUTES.home}>
        Về trang chủ
      </Link>
    </div>
  </section>
);
