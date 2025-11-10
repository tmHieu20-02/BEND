const User = require('../models/userModel'); // Import Model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- HÀM XÁC THỰC (AUTH) ---

/**
 * [POST] /api/users/register
 * Đăng ký người dùng mới (CÓ MÃ HÓA MẬT KHẨU)
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Thiếu email hoặc mật khẩu' });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    });

  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

/**
 * [POST] /api/users/login
 * Đăng nhập và trả về JWT Token
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// --- CÁC HÀM CRUD CƠ BẢN (ĐÃ CHUYỂN SANG SEQUELIZE) ---

/**
 * [GET] /api/users
 * Lấy danh sách TẤT CẢ người dùng
 */
exports.listUsers = async (req, res) => {
  try {
    // Tương đương: SELECT * FROM users
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'createdAt'] // Chỉ lấy các trường an toàn
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

/**
 * [GET] /api/users/:id
 * Lấy thông tin MỘT người dùng theo ID
 */
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    // Tương đương: SELECT * FROM users WHERE id = ?
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'createdAt'] // Chỉ lấy các trường an toàn
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

/**
 * [POST] /api/users
 * Tạo người dùng mới (Lưu ý: Hàm này KHÔNG mã hóa mật khẩu)
 * * GHI CHÚ: Bạn nên dùng hàm 'register' ở trên để tạo người dùng
 * vì nó mã hóa mật khẩu. Hàm này chỉ hữu ích nếu bạn muốn
 * admin tạo user mà không cần mật khẩu.
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Bạn nên thêm logic kiểm tra email tồn tại ở đây
    
    // Tương đương: INSERT INTO users ...
    const newUser = await User.create({
      name: name || '',
      email: email || '',
      password: password || 'default_password' // Cẩn thận! Mật khẩu không được mã hóa
    });
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

/**
 * [PUT] /api/users/:id
 * Cập nhật thông tin người dùng
 */
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, email } = req.body;
    
    // Tương đương: UPDATE users SET name = ?, email = ? WHERE id = ?
    await user.update({
      name: name || user.name, // Giữ lại giá trị cũ nếu không cung cấp
      email: email || user.email
    });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

/**
 * [DELETE] /api/users/:id
 * Xóa người dùng
 */
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Tương đương: DELETE FROM users WHERE id = ?
    await user.destroy();
    
    res.json({ message: 'Xóa người dùng thành công', deleted: user });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};