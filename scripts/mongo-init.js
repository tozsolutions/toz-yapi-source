// MongoDB initialization script
db = db.getSiblingDB('toz-yapi-db');

// Create collections
db.createCollection('users');
db.createCollection('projects');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ isActive: 1 });

db.projects.createIndex({ status: 1, priority: 1 });
db.projects.createIndex({ 'location.city': 1 });
db.projects.createIndex({ 'team.projectManager': 1 });
db.projects.createIndex({ createdAt: -1 });
db.projects.createIndex({ isActive: 1 });

print('Database initialized successfully!');