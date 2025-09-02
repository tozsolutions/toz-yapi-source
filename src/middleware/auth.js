const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token provided, authorization denied',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('JWT verification failed:', error.message);
    res.status(401).json({
      success: false,
      error: 'Token is not valid',
    });
  }
};

// Optional auth middleware - continues even if no token
const optionalAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      logger.warn('Optional auth - invalid token:', error.message);
    }
  }

  next();
};

module.exports = { auth, optionalAuth };
