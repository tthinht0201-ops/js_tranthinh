# Cập nhật lịch làm việc theo ngày cụ thể

- `DoctorSchedulePage` giờ ưu tiên **Ngày làm việc cụ thể** ở đầu trang.
- Bác sĩ chọn trực tiếp ngày (ví dụ 15/09/2026), giờ bắt đầu, giờ kết thúc và thời lượng slot.
- Lịch lặp theo Thứ 2–Chủ nhật vẫn được giữ nhưng chuyển thành phần **tùy chọn**, thu gọn bên dưới.
- Nếu một ngày có `DoctorDateSchedule`, lịch ngày cụ thể được ưu tiên hơn lịch lặp theo tuần.
- `BlockedTime` tiếp tục khóa slot ngay, không cần Admin/Lễ tân duyệt.
- Không có thay đổi schema/migration mới trong bản cập nhật UI này.
