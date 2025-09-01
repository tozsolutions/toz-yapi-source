import { generateToken, verifyToken, hashPassword, comparePassword } from '../utils/auth';
import { config } from '../config/config';

// Mock config for testing
jest.mock('../config/config', () => ({
  config: {
    jwtSecret: 'test-secret',
    jwtExpiresIn: '1h',
    bcryptSaltRounds: 10,
  }
}));

describe('Auth Utils', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const payload = {
        userId: 'test-user-id',
        email: 'test@example.com',
        role: 'user'
      };
      
      const token = generateToken(payload);
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });
  });
  
  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const payload = {
        userId: 'test-user-id',
        email: 'test@example.com',
        role: 'user'
      };
      
      const token = generateToken(payload);
      const decoded = verifyToken(token);
      
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.role).toBe(payload.role);
    });
    
    it('should throw error for invalid token', () => {
      expect(() => {
        verifyToken('invalid-token');
      }).toThrow('Invalid or expired token');
    });
  });
  
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'testpassword123';
      const hash = await hashPassword(password);
      
      expect(hash).not.toBe(password);
      expect(typeof hash).toBe('string');
      expect(hash.length).toBeGreaterThan(0);
    });
  });
  
  describe('comparePassword', () => {
    it('should compare password and hash correctly', async () => {
      const password = 'testpassword123';
      const hash = await hashPassword(password);
      
      const isValid = await comparePassword(password, hash);
      expect(isValid).toBe(true);
      
      const isInvalid = await comparePassword('wrongpassword', hash);
      expect(isInvalid).toBe(false);
    });
  });
});