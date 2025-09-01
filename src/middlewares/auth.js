const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('../utils/logger');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({
        error: 'Access denied. No token provided.',
      });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

    if (!token) {
      return res.status(401).json({
        error: 'Access denied. Invalid token format.',
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;

    logger.debug(`User ${decoded.id} authenticated successfully`);
    next();
  } catch (error) {
    logger.warn(`Authentication failed: ${error.message}`);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired.',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token.',
      });
    }

    return res.status(401).json({
      error: 'Authentication failed.',
    });
  }
};

// Optional auth middleware - doesn't throw error if no token
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return next();
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;

    logger.debug(`Optional auth: User ${decoded.id} authenticated`);
  } catch (error) {
    logger.warn(`Optional auth failed: ${error.message}`);
    // Don't return error, just continue without auth
  }

  next();
};

module.exports = {
  authMiddleware,
  optionalAuth,
};
