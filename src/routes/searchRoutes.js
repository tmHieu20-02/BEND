// src/routes/searchRoutes.js
const express = require('express');
const router = express.Router();

// 1. Import đúng tên hàm đã export
const { searchServices } = require('../controllers/searchController');

// 2. Sử dụng hàm đó (Đây là dòng 11 gây lỗi của bạn)
// Nó sẽ hết lỗi nếu 'searchServices' được import đúng
router.get('/search', searchServices);

module.exports = router;