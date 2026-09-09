# Chuẩn bị source trước khi deploy Vercel

Bản này đã được dọn để dùng làm source deploy:

- Không chứa `backend/.env`.
- Không chứa `node_modules` hoặc `dist`.
- Không commit `backend/src/generated/prisma`; Vercel sẽ chạy `prisma generate` qua `postinstall`.
- `backend/.env.example` và `backend/.env.production.example` chỉ chứa placeholder.
- `prisma` CLI nằm trong `dependencies` để `postinstall` hoạt động ổn định trong môi trường production.
- Node runtime được khóa ở `22.x`.
- Gemini model example dùng model ID `gemini-3.5-flash`.

Khi deploy backend, phải khai báo `DATABASE_URL` trước khi build vì `prisma.config.ts` đọc biến này trong lúc `prisma generate`.

Không chạy `prisma db seed` trên production nếu vẫn giữ các tài khoản demo trong `prisma/seed.ts`.
