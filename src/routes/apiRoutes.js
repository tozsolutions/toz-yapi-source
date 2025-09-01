const express = require('express');
const { catchAsync } = require('../middleware/errorHandler');

const router = express.Router();

/**
 * @swagger
 * /api/v1/status:
 *   get:
 *     summary: Get API status
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API status information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "online"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 uptime:
 *                   type: number
 *                   example: 3600
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/status', catchAsync(async (req, res) => {
  res.json({
    status: 'online',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
}));

/**
 * @swagger
 * /api/v1/info:
 *   get:
 *     summary: Get API information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 version:
 *                   type: string
 *                 author:
 *                   type: string
 */
router.get('/info', catchAsync(async (req, res) => {
  res.json({
    name: 'Toz API Source',
    description: 'Production-ready API for Toz Solutions',
    version: '1.0.0',
    author: 'Toz Solutions',
    documentation: '/api/docs',
    endpoints: {
      status: '/api/v1/status',
      health: '/health',
      users: '/api/users'
    }
  });
}));

module.exports = router;
