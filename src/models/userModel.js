// src/models/userModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database'); // Import kết nối database

// Định nghĩa model 'User'
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Email phải là duy nhất
    validate: {
      isEmail: true // Kiểm tra định dạng email
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users', // Tên bảng trong MySQL
  timestamps: true    // Tự động thêm cột createdAt và updatedAt
});

module.exports = User;