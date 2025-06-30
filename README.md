# Building Management Project/ ProjectII-IT3931

Ứng dụng quản lý tòa nhà cho thuê sử dụng React.js + Node.js + PostgreSQL.

## 🛠 Công nghệ sử dụng

### 🔙 Backend

- Node.js v22
- Express.js v4
- Sequelize ORM v6
- PostgreSQL v17
- JWT + Passport: xác thực người dùng
- Joi: kiểm tra dữ liệu đầu vào
- bcrypt: mã hóa mật khẩu
- dotenv, xlsx, ...

### 🔜 Frontend

- React.js v19
- react-router-dom v7
- axios v1
- Context API: lưu token và phân quyền
- Material-UI (MUI)
- Tailwind CSS

## ⚙️ Hướng dẫn cài đặt

### 1. Clone project

git clone https://github.com/dung2711/BuildingManagementProject.git
cd BuildingManagementProject

### 2. Cài đặt Backend

```bash
cd project2_backend
npm install
```

Tạo file `.env` trong thư mục `backend`:

```env
PG_USERNAME=postgres
PG_PASSWORD=YOURPASS
PG_PORT=5432
PG_HOST=localhost
PG_DATABASE=YOURDATABASE
SECRET_KEY=YOURKEY
```
```bash
nodemon index.js
```
Server backend sẽ chạy tại `http://localhost:4000`

### 3. Cài đặt Frontend

```bash
cd ../project2_frontend
npm install
npm start
```
Ứng dụng frontend chạy tại `http://localhost:3000`

## 📁 Cấu trúc thư mục chính

### Backend (`/backend`)

```
project2_backend/src
├── controllers/      # Xử lý logic nghiệp vụ
├── models/           # Sequelize models
├── routes/           # Định nghĩa các API endpoint
├── middlewares/      # Kiểm tra token, phân quyền
├── validators/       # Kiểm tra dữ liệu đầu vào với Joi
├── config/           # Cấu hình Sequelize và kết nối DB
├── .env              # Biến môi trường
└── index.js         # Điểm khởi chạy ứng dụng
```

### Frontend (`/frontend`)

```
project2_frontend/src
├── components/       # Các component tái sử dụng
├── pages/            # Các trang tương ứng với các route
├── contexts/         # Lưu trạng thái đăng nhập (AuthContext)
├── api/              # Cấu hình Axios và gọi API
├── routes/           # Định nghĩa phân quyền route
├── App.js            # Định nghĩa các route
└── index.js          # Điểm khởi chạy React
```


##  Vai trò người dùng

- **Admin**: Quản lý tài khoản hệ thống
- **Manager**: Quản lý khách hàng, thiết bị, sự cố, khiếu nại
- **Customer**: Đặt lịch, gửi yêu cầu, theo dõi trạng thái

---
