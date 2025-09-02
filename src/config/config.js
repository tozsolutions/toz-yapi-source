require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database configuration (placeholder for future use)
  database: {
    url: process.env.DATABASE_URL || 'sqlite://./database.sqlite',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS) || 10,
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 60000
  },

  // JWT configuration (placeholder for future use)
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  // CORS settings
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },

  // API settings
  api: {
    prefix: '/api',
    version: 'v1',
    pagination: {
      defaultLimit: 20,
      maxLimit: 100
    }
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined'
  },

  // File upload settings
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
    allowedTypes: process.env.ALLOWED_FILE_TYPES?.split(',') || [
      'image/jpeg', 'image/png', 'image/gif', 'application/pdf'
    ]
  }
};

module.exports = config;
