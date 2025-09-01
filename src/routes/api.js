const express = require('express');

const router = express.Router();

// Import route modules
const projectRoutes = require('./projects');
const authRoutes = require('./auth');

// API version info
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TOZ Yapı API',
    version: process.env.API_VERSION || 'v1',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      health: '/health',
    },
  });
});

// Route definitions
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
