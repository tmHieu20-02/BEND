const express = require('express');
const cors = require('cors');
require('dotenv').config(); // <-- Thêm dòng này

// --- THÊM PHẦN KẾT NỐI DB VÀ MODEL ---
const { connectDB, sequelize } = require('../database');
require('./models/userModel');
require('./models/venueModel');
// ------------------------------------

const apiRouter = require('./routes'); // (Tôi giả định file này là /routes/index.js)

const app = express();
const PORT = process.env.PORT || 10000;


app.use(cors());
app.use(express.json());

// --- THÊM HÀM KẾT NỐI DB ---
connectDB(); // Gọi hàm kết nối database
// ----------------------------

// Mount API router
app.use('/api', apiRouter);

// Global 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// --- THÊM HÀM ĐỒNG BỘ (SYNC) ---
// Đặt hàm sync này ngay TRƯỚC app.listen
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Đã đồng bộ models (tạo bảng) thành công.');

  // Chỉ khởi động server SAU KHI sync thành công
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);

  });

}).catch(err => {
  console.error('❌ Lỗi đồng bộ models:', err);
});