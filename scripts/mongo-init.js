// MongoDB initialization script
db = db.getSiblingDB('toz-yapi-dev');

// Create collections
db.createCollection('users');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "createdAt": -1 });
db.users.createIndex({ "name": "text", "email": "text" });

// Insert sample data (optional)
db.users.insertOne({
  name: "Admin User",
  email: "admin@tozsolutions.com",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2xXUh3L7Be", // password123
  role: "admin",
  isActive: true,
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

print("Database initialized successfully");