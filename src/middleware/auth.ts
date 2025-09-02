import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import { sendError } from '../utils/response';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role?: string;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      sendError(res, 'No token provided', undefined, 401);
      return;
    }
    
    const token = authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      sendError(res, 'Invalid token format', undefined, 401);
      return;
    }
    
    const decoded = verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    sendError(res, 'Invalid or expired token', undefined, 401);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'Authentication required', undefined, 401);
      return;
    }
    
    if (roles.length > 0 && !roles.includes(req.user.role || '')) {
      sendError(res, 'Insufficient permissions', undefined, 403);
      return;
    }
    
    next();
  };
};