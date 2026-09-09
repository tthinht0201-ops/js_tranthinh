# Setup local trên Windows

## 1. Backend

Mở CMD/PowerShell tại thư mục `backend`:

```cmd
copy .env.example .env
npm install
npm run prisma:generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Thứ tự `prisma:generate` trước `build/dev` là quan trọng vì Prisma Client được tạo vào `src/generated/prisma` và thư mục này không lưu trong source ZIP/Git.

## 2. Frontend

Mở terminal khác tại `frontend`:

```cmd
copy .env.example .env
npm install
npm run dev
```

## 3. Kiểm tra

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5000/api/health`

Nếu VS Code hiển thị lỗi đỏ ở import Prisma ngay sau khi giải nén, chạy `npm run prisma:generate` trong `backend` rồi reload TypeScript server/VS Code.
