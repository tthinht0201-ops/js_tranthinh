# Cấu trúc project

```text
MEDICAL/
├─ backend/
│  ├─ prisma/
│  │  ├─ migrations/          # Migration đã version hóa
│  │  ├─ schema.prisma        # Data model
│  │  └─ seed.ts              # Dữ liệu test
│  ├─ src/
│  │  ├─ config/              # Environment/configuration
│  │  ├─ generated/prisma/    # Prisma Client tự sinh (VS Code được cấu hình ẩn)
│  │  ├─ lib/                 # Prisma instance
│  │  ├─ middlewares/         # Auth, role, error handling
│  │  ├─ modules/             # Business modules theo domain
│  │  │  ├─ auth/
│  │  │  ├─ patients/
│  │  │  ├─ doctors/
│  │  │  ├─ specialties/
│  │  │  ├─ schedules/
│  │  │  ├─ appointments/
│  │  │  ├─ reviews/
│  │  │  ├─ statistics/
│  │  │  └─ ai/
│  │  ├─ types/
│  │  ├─ utils/
│  │  ├─ app.ts
│  │  └─ server.ts
│  └─ .env.example
│
├─ frontend/
│  ├─ src/
│  │  ├─ app/                 # Router và route constants
│  │  ├─ auth/                # Auth context + token helpers
│  │  ├─ components/
│  │  │  ├─ layout/
│  │  │  └─ routing/
│  │  ├─ pages/
│  │  │  ├─ public/           # Trang công khai
│  │  │  ├─ patient/          # Trang bệnh nhân
│  │  │  ├─ doctor/           # Trang bác sĩ
│  │  │  ├─ admin/            # Admin / receptionist
│  │  │  └─ system/           # 403 / 404
│  │  ├─ lib/                 # Axios/API client
│  │  ├─ types/
│  │  ├─ assets/
│  │  ├─ main.tsx
│  │  └─ index.css
│  ├─ nginx.conf              # SPA rewrite khi deploy Docker/Nginx
│  └─ vercel.json             # SPA rewrite khi deploy Vercel
│
├─ docs/
├─ .vscode/
├─ docker-compose.yml         # Local stack
└─ README.md
```

## Nguyên tắc

- Backend chia theo domain/module, không gom tất cả controller/service vào một thư mục chung.
- Frontend chia page theo vai trò để dễ tìm file.
- URL tập trung tại `frontend/src/app/routes.ts`.
- Không sửa file trong `backend/src/generated/prisma`; chạy `npm run prisma:generate` để tạo lại.
