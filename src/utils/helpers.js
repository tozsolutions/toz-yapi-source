/**
 * Utility functions for common operations
 */

/**
 * Generate a random ID (for demonstration purposes)
 * In production, use proper UUID library
 */
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize string input
 */
const sanitizeString = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Paginate results
 */
const paginate = (array, page = 1, limit = 20) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    data: array.slice(startIndex, endIndex),
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: array.length,
      totalPages: Math.ceil(array.length / limit),
      hasNext: endIndex < array.length,
      hasPrev: startIndex > 0
    }
  };
};

/**
 * Format date to ISO string
 */
const formatDate = (date = new Date()) => {
  return date.toISOString();
};

/**
 * Create API response format
 */
const createResponse = (data, message = 'Success', status = 200) => {
  return {
    status,
    message,
    data,
    timestamp: formatDate()
  };
};

/**
 * Create error response format
 */
const createErrorResponse = (message, code = 'INTERNAL_ERROR', status = 500) => {
  return {
    status,
    error: {
      message,
      code,
      timestamp: formatDate()
    }
  };
};

/**
 * Delay function for testing
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  generateId,
  isValidEmail,
  sanitizeString,
  paginate,
  formatDate,
  createResponse,
  createErrorResponse,
  delay
};
