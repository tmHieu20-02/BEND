// src/controllers/serviceController.js
const Venue = require('../models/venueModel'); // Import model Venue

/**
 * [POST] /api/services
 * Tạo một Venue (địa điểm/dịch vụ) mới
 */
exports.createVenue = async (req, res) => {
  try {
    // Logic RẤT ĐƠN GIẢN: Chỉ cần tạo
    const newVenue = await Venue.create(req.body);

    res.status(201).json({
      message: 'Tạo địa điểm thành công!',
      data: newVenue
    });

  } catch (error) {
    res.status(500).json({
      message: 'Lỗi server khi tạo địa điểm',
      error: error.message
    });
  }
};

/**
 * [GET] /api/services
 * Lấy TẤT CẢ Venues (Không lọc, không sắp xếp phức tạp)
 */
exports.getAllVenues = async (req, res) => {
  try {
    // Logic RẤT ĐƠN GIẢN: Chỉ cần tìm tất cả
    const venues = await Venue.findAll();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({
      message: 'Lỗi server khi lấy danh sách địa điểm',
      error: error.message
    });
  }
};

/**
 * [GET] /api/services/:id
 * Lấy chi tiết MỘT Venue theo ID
 */
exports.getVenueById = async (req, res) => {
  try {
    const { id } = req.params;
    // Logic RẤT ĐƠN GIẢN: Chỉ cần tìm bằng ID
    const venue = await Venue.findByPk(id);

    if (!venue) {
      return res.status(404).json({ message: 'Không tìm thấy địa điểm.' });
    }
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({
      message: 'Lỗi server khi lấy chi tiết địa điểm',
      error: error.message
    });
  }
};

/**
 * [PUT] /api/services/:id
 * Cập nhật một Venue
 */
exports.updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findByPk(id);

    if (!venue) {
      return res.status(404).json({ message: 'Không tìm thấy địa điểm.' });
    }
    // Logic RẤT ĐƠN GIẢN: Chỉ cần cập nhật
    const updatedVenue = await venue.update(req.body);

    res.status(200).json({
      message: 'Cập nhật địa điểm thành công!',
      data: updatedVenue
    });
  } catch (error) {
    res.status(500).json({
      message: 'Lỗi server khi cập nhật địa điểm',
      error: error.message
    });
  }
};

/**
 * [DELETE] /api/services/:id
 * Xóa một Venue
 */
exports.deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findByPk(id);

    if (!venue) {
      return res.status(4404).json({ message: 'Không tìm thấy địa điểm.' });
    }
    // Logic RẤT ĐƠN GIẢN: Chỉ cần xóa
    await venue.destroy();

    res.status(200).json({
      message: 'Xóa địa điểm thành công!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Lỗi server khi xóa địa điểm',
      error: error.message
    });
  }
};