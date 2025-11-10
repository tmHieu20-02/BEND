// database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load file .env cho local

let sequelize;

if (process.env.DATABASE_URL) {
  // 1. Dùng cho DEPLOY (trên Render)
  // Render sẽ cung cấp URL này, ví dụ: "mysql://user:pass@host/db"
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: { // Một số dịch vụ DB trên mây yêu cầu SSL
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // 2. Dùng cho LOCAL (máy của bạn)
  sequelize = new Sequelize('service_booking_app', 'root', 'Tominhhieu2025', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  });
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối MySQL (Sequelize) thành công.');
  } catch (error) {
    console.error('❌ Lỗi kết nối MySQL (Sequelize):', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };