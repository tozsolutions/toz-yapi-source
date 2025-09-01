import morgan from 'morgan';
import { logger } from '../config/logger.js';

// Create a stream object with a 'write' function that will be used by Morgan
const stream = {
  write: message => {
    // Use the logger to log the HTTP requests
    logger.info(message.trim());
  },
};

// Define the Morgan format
const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

// Create the Morgan middleware
export const requestLogger = morgan(format, {
  stream,
  skip: (req, res) => {
    // Skip logging for health check endpoints in production
    if (process.env.NODE_ENV === 'production' && req.url === '/health') {
      return true;
    }
    return false;
  },
});
