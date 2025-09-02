const express = require('express');
const config = require('../config/config');

// Import route modules
const userRoutes = require('./users');
const authRoutes = require('./auth');

const router = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: API information endpoint
 *     tags: [API]
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 version:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                 endpoints:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/', (req, res) => {
  res.json({
    message: 'TOZ YAPI API',
    version: config.api.version,
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /api - API information',
      'GET /health - Health check',
      'POST /api/auth/register - User registration',
      'POST /api/auth/login - User login',
      'GET /api/users - Get users (requires auth)',
      'GET /api/users/:id - Get user by ID (requires auth)',
    ],
  });
});

// Mount route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
