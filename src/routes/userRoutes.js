const express = require('express');
const router = express.Router();

// Import tất cả các hàm từ controller
const { 
  register, 
  login, 
  listUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController');

// === Routes cho Xác thực (Auth) ===
router.post('/register', register); // <-- THÊM CÁI NÀY
router.post('/login', login);       // <-- THÊM CÁI NÀY

// === Routes cho CRUD (Bạn đã có) ===
router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;