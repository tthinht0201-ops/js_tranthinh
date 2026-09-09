import { Link } from "react-router";

import { ROUTES } from "../../app/routes";

export const NotFoundPage = () => (
  <section className="system-page">
    <div className="system-card">
      <span className="eyebrow">404</span>
      <h1>Không tìm thấy trang</h1>
      <p className="muted">
        Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi.
      </p>
      <Link className="button button-primary" to={ROUTES.home}>
        Về trang chủ
      </Link>
    </div>
  </section>
);
