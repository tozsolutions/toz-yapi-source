import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { sendSuccess, sendError } from '../utils/response';
import { CreateUserData, LoginData } from '../types';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role?: string;
  };
}

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name, role }: CreateUserData = req.body;
      
      // Ensure 'email' is a string to prevent NoSQL injection
      if (typeof email !== 'string') {
        sendError(res, 'Invalid email format', undefined, 400);
        return;
      }
      
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        sendError(res, 'User already exists with this email', undefined, 409);
        return;
      }
      
      // Hash password
      const hashedPassword = await hashPassword(password);
      
      // Create user
      const user = await UserModel.create({
        email,
        name,
        password: hashedPassword,
        role: role || 'user',
      });
      
      // Generate token
      const token = generateToken({
        userId: (user._id as any).toString(),
        email: user.email,
        role: user.role,
      });
      
      sendSuccess(
        res,
        'User registered successfully',
        {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          token,
        },
        201
      );
    } catch (error) {
      sendError(res, 'Failed to register user', (error as Error).message);
    }
  }
  
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: LoginData = req.body;
      
      // Find user and include password
      const user = await UserModel.findOne({ email, isActive: true }).select('+password');
      if (!user) {
        sendError(res, 'Invalid credentials', undefined, 401);
        return;
      }
      
      // Check password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        sendError(res, 'Invalid credentials', undefined, 401);
        return;
      }
      
      // Generate token
      const token = generateToken({
        userId: (user._id as any).toString(),
        email: user.email,
        role: user.role,
      });
      
      sendSuccess(res, 'Login successful', {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      sendError(res, 'Failed to login', (error as Error).message);
    }
  }
  
  async refresh(req: Request, res: Response): Promise<void> {
    try {
      // This is a simplified refresh implementation
      // In a real application, you would use refresh tokens
      const authReq = req as AuthenticatedRequest;
      
      if (!authReq.user) {
        sendError(res, 'Authentication required', undefined, 401);
        return;
      }
      
      const user = await UserModel.findById(authReq.user.userId);
      if (!user || !user.isActive) {
        sendError(res, 'User not found or inactive', undefined, 401);
        return;
      }
      
      const token = generateToken({
        userId: (user._id as any).toString(),
        email: user.email,
        role: user.role,
      });
      
      sendSuccess(res, 'Token refreshed successfully', { token });
    } catch (error) {
      sendError(res, 'Failed to refresh token', (error as Error).message);
    }
  }
  
  async logout(req: Request, res: Response): Promise<void> {
    try {
      // In a real application, you would invalidate the token
      // For now, we just send a success response
      sendSuccess(res, 'Logout successful');
    } catch (error) {
      sendError(res, 'Failed to logout', (error as Error).message);
    }
  }
}

export const authController = new AuthController();