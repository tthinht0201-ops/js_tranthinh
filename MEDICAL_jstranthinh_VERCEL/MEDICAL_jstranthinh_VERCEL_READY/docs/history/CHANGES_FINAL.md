# Thay đổi cuối

- Bệnh nhân đặt slot trống -> Appointment được tạo thẳng ở `CONFIRMED`, không cần Admin/Lễ tân xác nhận.
- Bác sĩ tạo `BlockedTime` -> khóa slot ngay, không cần Admin/Lễ tân duyệt.
- Nếu BlockedTime đè lên lịch đã xác nhận -> Appointment chuyển `NEEDS_RESCHEDULE`; Admin/Lễ tân chỉ xử lý đổi/hủy với bệnh nhân.
- Bổ sung lịch theo ngày cụ thể (`DoctorDateSchedule`) để ghi đè lịch tuần của đúng ngày đó.
- Admin không còn nút xác nhận lịch mới trên giao diện.
- Migration mới tạo `DoctorDateSchedule`, chuyển dữ liệu `PENDING` hiện có sang `CONFIRMED` và đổi default status thành `CONFIRMED`.

## Chạy sau khi giải nén

Backend:

```bash
cd backend
copy .env.example .env
npm install
npm run prisma:generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Frontend (terminal khác):

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```
