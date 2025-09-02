import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { sendSuccess, sendError } from '../utils/response';
import { config } from '../config/config';

const router = Router();

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  database: {
    status: 'connected' | 'disconnected';
    name: string;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
}

router.get('/', (req: Request, res: Response): void => {
  const memUsage = process.memoryUsage();
  const memoryUsed = memUsage.heapUsed;
  const memoryTotal = memUsage.heapTotal;
  
  const healthStatus: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
    version: process.env.npm_package_version || '1.0.0',
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      name: config.dbName,
    },
    memory: {
      used: Math.round(memoryUsed / 1024 / 1024 * 100) / 100, // MB
      total: Math.round(memoryTotal / 1024 / 1024 * 100) / 100, // MB
      percentage: Math.round((memoryUsed / memoryTotal) * 100 * 100) / 100,
    },
  };
  
  // Check if any critical services are down
  if (mongoose.connection.readyState !== 1) {
    healthStatus.status = 'unhealthy';
    sendError(res, 'Service unhealthy', 'Database connection failed', 503);
    return;
  }
  
  sendSuccess(res, 'Service is healthy', healthStatus);
});

// Detailed health check endpoint
router.get('/detailed', (req: Request, res: Response): void => {
  const memUsage = process.memoryUsage();
  
  const detailedHealth = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
    version: process.env.npm_package_version || '1.0.0',
    system: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      pid: process.pid,
    },
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      name: config.dbName,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
    },
    memory: {
      rss: Math.round(memUsage.rss / 1024 / 1024 * 100) / 100,
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024 * 100) / 100,
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024 * 100) / 100,
      external: Math.round(memUsage.external / 1024 / 1024 * 100) / 100,
      arrayBuffers: Math.round(memUsage.arrayBuffers / 1024 / 1024 * 100) / 100,
    },
  };
  
  sendSuccess(res, 'Detailed health information', detailedHealth);
});

// Liveness probe endpoint
router.get('/live', (req: Request, res: Response): void => {
  res.status(200).json({ status: 'alive' });
});

// Readiness probe endpoint
router.get('/ready', (req: Request, res: Response): void => {
  if (mongoose.connection.readyState === 1) {
    res.status(200).json({ status: 'ready' });
  } else {
    res.status(503).json({ status: 'not ready', reason: 'database not connected' });
  }
});

export { router as healthRoutes };