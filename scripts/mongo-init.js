// MongoDB initialization script
db = db.getSiblingDB('toz-yapi-source');

// Create collections
db.createCollection('users');
db.createCollection('yapisources');

// Create indexes for users collection
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });
db.users.createIndex({ "isActive": 1 });
db.users.createIndex({ "createdAt": -1 });

// Create indexes for yapisources collection
db.yapisources.createIndex({ "name": 1 });
db.yapisources.createIndex({ "type": 1 });
db.yapisources.createIndex({ "isActive": 1 });
db.yapisources.createIndex({ "createdBy": 1 });
db.yapisources.createIndex({ "tags": 1 });
db.yapisources.createIndex({ "createdAt": -1 });
db.yapisources.createIndex({ "lastSyncAt": -1 });

// Compound indexes
db.yapisources.createIndex({ "isActive": 1, "type": 1 });
db.yapisources.createIndex({ "createdBy": 1, "isActive": 1 });

print("Database initialization completed successfully!");