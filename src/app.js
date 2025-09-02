const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const config = require('./config/config');
const logger = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

// Routes
const healthRoutes = require('./routes/health');
const apiRoutes = require('./routes/api');

// Swagger
const swaggerSetup = require('./config/swagger');

const app = express();

// Connect to database only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const connectDB = require('./config/database');
  connectDB().catch((err) => {
    logger.error('Failed to connect to database:', err);
    // Don't exit in development, just log the error
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  });
}

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  }),
);

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Logging middleware
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Swagger documentation
if (config.swagger.enabled) {
  swaggerSetup(app);
}

// Routes
app.use('/health', healthRoutes);
app.use(config.api.prefix, apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'TOZ YAPI API Server',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    documentation: config.swagger.enabled ? '/api-docs' : 'Not available',
  });
});

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

// Uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Start server only if this file is run directly
if (require.main === module) {
  const PORT = config.server.port;
  const HOST = config.server.host;

  app.listen(PORT, HOST, () => {
    logger.info(`🚀 TOZ YAPI API Server running on http://${HOST}:${PORT}`);
    logger.info(`📚 Environment: ${config.environment}`);
    if (config.swagger.enabled) {
      logger.info(`📖 API Documentation: http://${HOST}:${PORT}/api-docs`);
    }
  });
}

module.exports = app;
