// src/controllers/searchController.js
const { Op, Sequelize } = require('sequelize');
const Venue = require('../models/venueModel');
const { sequelize } = require('../../database');

// Tên hàm là 'searchServices'
const searchServices = async (req, res) => {
  try {
    const { q, sort, filter, lat, lng, radius } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "Vui lòng cung cấp 'lat' và 'lng' của người dùng."
      });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const searchQuery = q || '';
    const searchRadiusMeters = (parseFloat(radius) || 5) * 1000;
    const whereClause = {};

    if (q) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${searchQuery}%` } },
        { category: { [Op.like]: `%${searchQuery}%` } }
      ];
    }
    if (filter === "open") {
      whereClause.isOpen = true;
    }

    const distanceLiteral = sequelize.literal(
      `ST_Distance_Sphere(POINT(lng, lat), POINT(${userLng}, ${userLat}))`
    );
    whereClause[Op.and] = sequelize.where(distanceLiteral, { [Op.lte]: searchRadiusMeters });

    const orderClause = [];
    if (sort === "rating") {
      orderClause.push(['rating', 'DESC']);
    } else {
      orderClause.push([sequelize.col('distance'), 'ASC']);
    }

    const venues = await Venue.findAll({
      attributes: {
        include: [
          [distanceLiteral, 'distance']
        ]
      },
      where: whereClause,
      order: orderClause
    });

    res.status(200).json(venues);

  } catch (error) {
    console.error("Lỗi khi tìm kiếm:", error);
    if (error.message.includes('ST_Distance_Sphere')) {
         return res.status(500).json({ message: "Lỗi hàm tính toán vị trí. Vui lòng kiểm tra phiên bản MySQL." });
    }
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

// Đảm bảo bạn export 'searchServices'
module.exports = {
  searchServices,
};