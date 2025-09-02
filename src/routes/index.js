const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes');

const router = express.Router();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Toz API Source',
      version: '1.0.0',
      description: 'Production-ready API for Toz Solutions',
      contact: {
        name: 'Toz Solutions',
        email: 'info@tozsolutions.com'
      }
    },
    servers: [
      {
        url: process.env.API_BASE_URL || 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// API documentation
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Toz API Documentation'
}));

// API routes
router.use('/users', userRoutes);
router.use('/v1', apiRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Toz API Source v1.0.0',
    documentation: '/api/docs',
    health: '/health',
    endpoints: {
      users: '/api/users',
      v1: '/api/v1'
    }
  });
});

module.exports = router;
