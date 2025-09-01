// Custom error class for operational errors
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Helper function to create error
export const createError = (message, statusCode) => {
  return new AppError(message, statusCode);
};

// Async wrapper to catch errors in async functions
export const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Helper function to send error response
export const sendErrorResponse = (res, error, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    error: error.message || error,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

// Helper function to send success response
export const sendSuccessResponse = (res, data, message, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    ...(message && { message }),
    ...(data && { data }),
  });
};
