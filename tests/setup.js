const mongoose = require('mongoose');

// Setup for tests
beforeAll(async () => {
  // Connect to test database
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/toz-yapi-test';
  
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

// Clean up after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

// Increase timeout for async operations
jest.setTimeout(30000);