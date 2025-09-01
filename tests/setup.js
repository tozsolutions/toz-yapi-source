import { jest } from '@jest/globals';

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key';
process.env.JWT_EXPIRE = '1h';
process.env.MONGODB_TEST_URI = 'mongodb://localhost:27017/toz-yapi-test';
process.env.BCRYPT_ROUNDS = '1'; // Lower rounds for faster tests
process.env.LOG_LEVEL = 'error'; // Reduce logging in tests

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Set timezone for consistent date testing
process.env.TZ = 'UTC';
