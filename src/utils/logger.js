const winston = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('../config/config');

// Create logs directory if it doesn't exist
const logDir = config.logging.dir;
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
  }),
);

// Define log levels and colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    http: 'magenta',
    debug: 'white',
  },
};

winston.addColors(customLevels.colors);

// Create transports
const transports = [
  // Console transport
  new winston.transports.Console({
    level: config.logging.level,
    format: winston.format.combine(winston.format.colorize({ all: true }), logFormat),
  }),

  // File transport for all logs
  new winston.transports.File({
    filename: path.join(logDir, 'app.log'),
    level: 'info',
    format: logFormat,
    maxsize: 10485760, // 10MB
    maxFiles: 5,
  }),

  // File transport for error logs
  new winston.transports.File({
    filename: path.join(logDir, 'error.log'),
    level: 'error',
    format: logFormat,
    maxsize: 10485760, // 10MB
    maxFiles: 5,
  }),
];

// Create logger
const logger = winston.createLogger({
  levels: customLevels.levels,
  level: config.logging.level,
  format: logFormat,
  transports,
  exitOnError: false,
});

// Handle uncaught exceptions and unhandled rejections
logger.exceptions.handle(
  new winston.transports.File({
    filename: path.join(logDir, 'exceptions.log'),
    format: logFormat,
  }),
);

logger.rejections.handle(
  new winston.transports.File({
    filename: path.join(logDir, 'rejections.log'),
    format: logFormat,
  }),
);

module.exports = logger;
