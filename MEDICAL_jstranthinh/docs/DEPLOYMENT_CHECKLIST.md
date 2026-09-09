# Checklist trước khi deploy public

## Backend

- Tạo PostgreSQL production riêng.
- Chạy `prisma migrate deploy`, không dùng `migrate dev` trên production.
- Đặt `NODE_ENV=production`.
- Tạo `JWT_SECRET` ngẫu nhiên tối thiểu 32 ký tự.
- `CORS_ORIGIN` chỉ chứa domain frontend thật; nhiều domain ngăn cách bằng dấu phẩy.
- Không chạy demo seed lên database production nếu vẫn chứa tài khoản/mật khẩu mẫu.
- Bật HTTPS tại hosting/reverse proxy.

## Frontend

- Set `VITE_API_URL=https://<backend-domain>/api` trước khi build.
- Vercel: `vercel.json` đã có SPA rewrite.
- Nginx/Docker: `nginx.conf` đã có `try_files ... /index.html`.
- Kiểm tra trực tiếp và refresh các URL `/patient/...`, `/doctor/...`, `/admin/...`.

## Tài khoản và dữ liệu

- Xóa/đổi mật khẩu tài khoản demo.
- Không commit `.env` thật.
- Không public database credentials, JWT secret hoặc Gemini API key.

## Auth

Bản hiện tại vẫn dùng Bearer JWT trong `localStorage`, phù hợp cho đồ án và giai đoạn test. Nếu hệ thống được dùng cho dữ liệu bệnh nhân thật, nên nâng cấp phiên đăng nhập sang HttpOnly + Secure cookie và bổ sung cơ chế CSRF phù hợp trước khi vận hành chính thức.
