require('dotenv').config({ path: '.env.example' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-for-testing-only';
process.env.MONGODB_URI = 'mongodb://localhost:27017/toz-yapi-test';

// Mock mongoose before any models are loaded
jest.mock('mongoose', () => ({
  Schema: class MockSchema {
    constructor() {
      this.methods = {};
      this.statics = {};
      return this;
    }
    pre() {
      return this;
    }
    index() {
      return this;
    }
    virtual() {
      return { get: jest.fn() };
    }
  },
  model: jest.fn(() => ({})),
  connect: jest.fn(),
  connection: {
    readyState: 1,
    on: jest.fn(),
    close: jest.fn(),
  },
}));

// Global test setup
beforeAll(() => {
  // Any global setup here
});

afterAll(() => {
  // Any global cleanup here
});

// Mock logger to avoid console output during tests
jest.mock('../src/utils/logger', () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
}));

// Mock database connection
jest.mock('../src/config/database', () => jest.fn());
