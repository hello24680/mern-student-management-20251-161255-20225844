# Ứng dụng Quản lý Học sinh

Ứng dụng quản lý học sinh được xây dựng với React, Express và MongoDB.

## Cấu trúc dự án

```
baitap5/
├── frontend/          # React frontend
├── backend/           # Express backend
│   ├── index.js      # Server chính
│   ├── Student.js    # Model Mongoose
│   └── docker-compose.yml
└── docs/             # Tài liệu
```

## Yêu cầu hệ thống

- Node.js (v14 trở lên)
- Docker và Docker Compose
- npm hoặc yarn

## Hướng dẫn cài đặt và chạy

### Bước 1: Khởi động MongoDB với Docker

```bash
cd backend
docker-compose up -d
```

Kiểm tra MongoDB đã chạy:
```bash
docker ps
```

### Bước 2: Chạy Backend

```bash
cd backend
npm install    # Nếu chưa cài đặt dependencies
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

### Bước 3: Chạy Frontend

Mở terminal mới:

```bash
cd frontend
npm install    # Nếu chưa cài đặt dependencies
npm start
```

Ứng dụng React sẽ chạy tại: `http://localhost:3000`

## API Endpoints

### GET /api/students
Lấy danh sách tất cả học sinh

**Response:**
```json
[
  {
    "_id": "...",
    "name": "Nguyễn Văn A",
    "age": 20,
    "class": "CNTT K65"
  }
]
```

## Tính năng

- [x] Hiển thị danh sách học sinh
- [x] Kết nối MongoDB qua Docker
- [x] Giao diện responsive với gradient đẹp mắt
- [x] Xử lý trạng thái loading và error

## Kết quả mong đợi

Khi chạy thành công, bạn sẽ thấy:
- Trang web hiển thị "Danh sách Học sinh"
- Nếu chưa có dữ liệu: "Chưa có học sinh nào trong danh sách."
- Không có lỗi CORS hoặc kết nối

## Troubleshooting

### Lỗi kết nối MongoDB
Đảm bảo Docker đang chạy và container MongoDB đã được khởi động:
```bash
docker-compose up -d
```

### Lỗi CORS
Đảm bảo backend đã cài đặt và sử dụng middleware `cors`

### Port đã được sử dụng
Nếu port 3000 hoặc 5000 đã được sử dụng, bạn có thể thay đổi trong:
- Frontend: thay đổi trong package.json script
- Backend: thay đổi PORT trong index.js
