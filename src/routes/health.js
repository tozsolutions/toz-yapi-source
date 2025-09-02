const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const logger = require('../config/logger');

// Health check endpoint
router.get('/', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
  };

  try {
    res.status(200).json({
      success: true,
      data: healthCheck,
    });
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      success: false,
      message: 'Health check failed',
    });
  }
});

// Database health check
router.get('/db', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  if (dbState === 1) {
    res.status(200).json({
      success: true,
      message: 'Database connection is healthy',
      state: states[dbState],
    });
  } else {
    res.status(503).json({
      success: false,
      message: 'Database connection is unhealthy',
      state: states[dbState],
    });
  }
});

// Detailed system info (for monitoring)
router.get('/info', (req, res) => {
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    success: true,
    data: {
      uptime: process.uptime(),
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`,
      },
      cpuUsage: process.cpuUsage(),
      version: process.version,
      platform: process.platform,
      arch: process.arch,
      environment: process.env.NODE_ENV || 'development',
    },
  });
});

module.exports = router;
