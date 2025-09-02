import { Router } from 'express';
import { yapiRoutes } from './yapi';
import { authRoutes } from './auth';

const router = Router();

// API routes
router.use('/auth', authRoutes);
router.use('/yapi', yapiRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'TOZ YAPI Source API',
    version: '1.0.0',
    endpoints: [
      'GET /api/v1 - API information',
      'GET /health - Health check',
      'POST /api/v1/auth/login - User authentication',
      'POST /api/v1/auth/register - User registration',
      'GET /api/v1/yapi/sources - Get YAPI sources',
      'POST /api/v1/yapi/sources - Create YAPI source',
    ],
    documentation: 'https://github.com/tozsolutions/toz-yapi-source/blob/main/README.md',
  });
});

export { router as apiRoutes };