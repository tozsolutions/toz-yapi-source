import dotenv from 'dotenv';

dotenv.config();

interface Config {
  nodeEnv: string;
  port: number;
  mongodbUri: string;
  dbName: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  bcryptSaltRounds: number;
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
  corsOrigin: string | string[];
  apiVersion: string;
  apiPrefix: string;
  logLevel: string;
  logFormat: string;
  healthCheckInterval: number;
  cacheTtl: number;
  maxFileSize: number;
  uploadPath: string;
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/toz-yapi-source',
  dbName: process.env.DB_NAME || 'toz-yapi-source',
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10),
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  apiVersion: process.env.API_VERSION || 'v1',
  apiPrefix: process.env.API_PREFIX || '/api',
  logLevel: process.env.LOG_LEVEL || 'info',
  logFormat: process.env.LOG_FORMAT || 'combined',
  healthCheckInterval: parseInt(process.env.HEALTH_CHECK_INTERVAL || '30000', 10),
  cacheTtl: parseInt(process.env.CACHE_TTL || '3600', 10),
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
  uploadPath: process.env.UPLOAD_PATH || './uploads',
};

// Validate required environment variables in production
if (config.nodeEnv === 'production') {
  const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
  
  if (config.jwtSecret === 'your-super-secret-jwt-key-change-this-in-production') {
    throw new Error('JWT_SECRET must be changed in production');
  }
}

export { config };