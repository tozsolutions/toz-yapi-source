import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { sendError } from '../utils/response';

interface CustomError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Default error values
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';
  
  // Log error details
  logger.error(`Error ${statusCode}: ${message}`, {
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    stack: error.stack,
  });
  
  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (error.name === 'MongoServerError' && (error as any).code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value entered';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }
  
  // Don't leak error details in production
  const errorDetails = process.env.NODE_ENV === 'production' ? undefined : error.stack;
  
  sendError(res, message, errorDetails, statusCode);
};