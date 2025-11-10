// src/models/venueModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database'); // Import kết nối database

// Định nghĩa model 'Venue' (tương ứng với bảng 'venues' của bạn)
const Venue = sequelize.define('Venue', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  rating: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: true
  },
  review_count: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  lat: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false
  },
  lng: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false
  },
  minPrice: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  maxPrice: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  // === RẤT QUAN TRỌNG ===
  tableName: 'venues', // Tên bảng chính xác trong MySQL
  timestamps: false    // Tắt tự động tạo cột 'createdAt' và 'updatedAt'
                     // vì bảng 'venues' bạn tự tạo không có chúng
});

module.exports = Venue;