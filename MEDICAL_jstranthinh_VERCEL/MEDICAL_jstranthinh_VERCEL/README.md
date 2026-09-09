# MEDICAL — Hệ thống đặt lịch khám bệnh

Full-stack TypeScript project cho phòng khám tư nhân nhỏ, xây dựng theo đề tài tốt nghiệp Full-stack JavaScript.

## Công nghệ

- Frontend: React + TypeScript + Vite, React Router, Axios, TanStack Query, React Hook Form, Zod, date-fns, Oxlint.
- Backend: Node.js + Express 5 + TypeScript, Prisma 7, PostgreSQL, JWT, bcryptjs, Zod, Helmet, CORS, rate limit, Oxlint.
- Database: PostgreSQL + Prisma Migrate + Prisma Seed.
- Deploy-ready: Docker/Nginx, Vercel SPA rewrite, environment configuration.

## Luồng hiện tại

### Bệnh nhân

- Đăng ký/đăng nhập và cập nhật hồ sơ.
- Tìm bác sĩ theo tên/chuyên khoa, xem profile và đánh giá.
- Xem slot trống theo ngày.
- Đặt lịch xong được `CONFIRMED` ngay, không cần Admin/Lễ tân duyệt.
- Hủy lịch trước thời hạn tối thiểu cấu hình trong backend.
- Đánh giá bác sĩ sau khi appointment `COMPLETED`.
- AI gợi ý chuyên khoa có disclaimer không phải chẩn đoán y khoa.

### Bác sĩ

- Xem danh sách bệnh nhân theo ngày.
- Thiết lập **ngày làm việc cụ thể** (ưu tiên chính).
- Có thể giữ lịch tuần mặc định như tùy chọn phụ.
- `DoctorDateSchedule` của một ngày ghi đè lịch tuần của đúng ngày đó.
- Tạo `BlockedTime` có hiệu lực ngay, không cần Admin duyệt.
- Nếu BlockedTime hoặc thay đổi lịch ngày làm ảnh hưởng appointment đã xác nhận, appointment chuyển `NEEDS_RESCHEDULE`.
- Đánh dấu lịch `COMPLETED` sau khi khám.

### Admin / Receptionist

- CRUD bác sĩ và chuyên khoa.
- Xem/lọc toàn bộ appointment.
- Không cần xác nhận appointment mới.
- Xử lý `NEEDS_RESCHEDULE`: phối hợp đổi hoặc hủy lịch.
- Xem thống kê lịch hẹn và bác sĩ được đặt nhiều.

## URL frontend 

```text
PUBLIC
/                         Trang chủ / danh sách bác sĩ
/login                    Đăng nhập
/register                 Đăng ký
/doctors/:id              Chi tiết bác sĩ + lịch trống

PATIENT
/patient/appointments     Lịch của tôi
/patient/profile          Hồ sơ bệnh nhân
/patient/ai               Gợi ý chuyên khoa

DOCTOR
/doctor/dashboard         Lịch khám của bác sĩ
/doctor/schedule          Quản lý lịch làm việc

ADMIN / RECEPTIONIST
/admin/dashboard          Tổng quan
/admin/appointments       Quản lý lịch hẹn
/admin/doctors            Quản lý bác sĩ
/admin/specialties        Quản lý chuyên khoa

SYSTEM
/403                      Không có quyền
*                         Trang 404
```

Các URL cũ `/my-appointments`, `/profile`, `/ai`, `/doctor`, `/admin` vẫn được redirect sang URL mới để không phá bookmark/test cũ.

## Cây thư mục

```text
MEDICAL/
├─ backend/
│  ├─ prisma/
│  │  ├─ migrations/
│  │  ├─ schema.prisma
│  │  └─ seed.ts
│  └─ src/
│     ├─ config/
│     ├─ generated/prisma/   # sinh bằng prisma generate; VS Code được cấu hình ẩn
│     ├─ lib/
│     ├─ middlewares/
│     ├─ modules/
│     │  ├─ auth/
│     │  ├─ patients/
│     │  ├─ doctors/
│     │  ├─ specialties/
│     │  ├─ schedules/
│     │  ├─ appointments/
│     │  ├─ reviews/
│     │  ├─ statistics/
│     │  └─ ai/
│     ├─ types/
│     ├─ utils/
│     ├─ app.ts
│     └─ server.ts
│
├─ frontend/
│  └─ src/
│     ├─ app/                # router + route constants
│     ├─ auth/
│     ├─ components/
│     │  ├─ layout/
│     │  └─ routing/
│     ├─ pages/
│     │  ├─ public/
│     │  ├─ patient/
│     │  ├─ doctor/
│     │  ├─ admin/
│     │  └─ system/
│     ├─ lib/
│     ├─ types/
│     ├─ assets/
│     ├─ main.tsx
│     └─ index.css
│
├─ docs/
├─ .vscode/
└─ docker-compose.yml
```

Chi tiết: `docs/PROJECT_STRUCTURE.md`.

## Chạy local lần đầu

### Backend

Tạo database PostgreSQL `medical_booking`, sau đó:

```bash
cd backend
copy .env.example .env
npm install
npm run prisma:generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

API: `http://localhost:5000/api`

Health check: `http://localhost:5000/api/health`

### Frontend

Mở terminal khác:

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Kiểm tra source

Backend:

```bash
npm run typecheck
npm run lint
```

Frontend:

```bash
npm run typecheck
npm run lint
npm run build
```

## Tài khoản demo

Xem dữ liệu hiện có trong `backend/prisma/seed.ts`. Các account demo chỉ dành cho local/test, không dùng trên production.

## Cấu hình môi trường

### Local frontend

```env
VITE_API_URL=http://localhost:5000/api
```

### Production frontend

Ví dụ frontend và backend deploy riêng:

```env
VITE_API_URL=https://api.medical.example.com/api
```

### Backend production

Tham khảo `backend/.env.production.example`:

```env
NODE_ENV=production
DATABASE_URL=...
JWT_SECRET=...
CORS_ORIGIN=https://medical.example.com
```

`CORS_ORIGIN` hỗ trợ nhiều frontend origin, ngăn cách bằng dấu phẩy.

## Deploy sau khi test ổn

- Vercel frontend: `frontend/vercel.json` đã có SPA rewrite.
- Docker/Nginx frontend: `frontend/nginx.conf` đã có SPA fallback.
- Backend production dùng `prisma migrate deploy`, không dùng `migrate dev`.
- Không commit `.env` thật.
- Không dùng mật khẩu/demo seed trên database public.
- Đọc `docs/DEPLOYMENT_CHECKLIST.md` trước khi đưa hệ thống lên Internet.

## Ghi chú bảo mật auth

 hiện tại vẫn dùng Bearer JWT lưu `localStorage`.
