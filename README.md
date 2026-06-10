# Teacher Reading Dashboard

Dashboard dành cho giáo viên quản lý hoạt động đọc sách và đánh giá kỹ năng đọc hiểu của học sinh.

## Công nghệ

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Lucide React Icons
- Recharts
- Mock data trong `src/data/mockData.ts`

## Cách chạy

```bash
npm install
npm run dev
```

Kiểm tra bản build:

```bash
npm run build
```

## Các trang đã hoàn thiện

- `/dashboard` - Tổng quan, thống kê, biểu đồ, hoạt động gần đây.
- `/questions` - Ngân hàng câu hỏi, tìm kiếm, bộ lọc, bảng, phân trang.
- `/questions/create` và `/questions/:id/edit` - Form thêm/chỉnh sửa câu hỏi.
- `/questions/import` - Import Excel và xem trước dữ liệu.
- `/question-sets` - Danh sách bộ đề với tab và thao tác demo.
- `/question-sets/create-matrix` - Tạo bộ đề theo ma trận kỹ năng.
- `/question-sets/create-random` - Tạo bộ đề ngẫu nhiên và xem trước.
- `/assignments/create` - Giao bộ câu hỏi cho trường, lớp hoặc cá nhân.
- `/reading-tasks` - Giao nhiệm vụ đọc sách theo tuần hoặc tháng.
- `/results` và `/results/:id` - Kết quả bài kiểm tra và chi tiết học sinh.
- `/reading-plan` - Kế hoạch đọc sách và thời khóa biểu tuần.
- `/reports` - Báo cáo thống kê Lexile và đọc hiểu.
- `/settings` - Cài đặt tài khoản giáo viên.

## Tương tác demo

Các nút chính có phản hồi trực quan: mở modal, chuyển trang, lọc dữ liệu, thêm/sửa dữ liệu giả lập, xem trước, lưu nháp, xuất báo cáo và hiển thị thông báo thành công.
