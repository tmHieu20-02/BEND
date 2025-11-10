const express = require('express');
const router = express.Router();

// Import sub-routers
const userRouter = require('./userRoutes');
const searchRouter = require('./searchRoutes');

// Example: /api/users
router.use('/users', userRouter);
// Search: /api/search?q=term
router.use('/search', searchRouter);

// health check at /api/health
router.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = router;
