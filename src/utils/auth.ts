import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config/config';

interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
    issuer: 'toz-yapi-source',
    audience: 'toz-yapi-client',
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret, {
      issuer: 'toz-yapi-source',
      audience: 'toz-yapi-client',
    }) as JwtPayload;
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, config.bcryptSaltRounds);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};