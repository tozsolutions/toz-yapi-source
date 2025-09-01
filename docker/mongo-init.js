# MongoDB initialization script
db = db.getSiblingDB('toz-yapi');

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: {
          bsonType: 'string',
          minLength: 2,
          maxLength: 50
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        },
        password: {
          bsonType: 'string',
          minLength: 6
        },
        role: {
          bsonType: 'string',
          enum: ['user', 'admin', 'manager']
        }
      }
    }
  }
});

db.createCollection('projects', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'description', 'location', 'owner'],
      properties: {
        name: {
          bsonType: 'string',
          minLength: 3,
          maxLength: 100
        },
        description: {
          bsonType: 'string',
          maxLength: 1000
        },
        status: {
          bsonType: 'string',
          enum: ['planning', 'active', 'completed', 'cancelled']
        }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ createdAt: -1 });

db.projects.createIndex({ owner: 1 });
db.projects.createIndex({ status: 1 });
db.projects.createIndex({ createdAt: -1 });
db.projects.createIndex({ 'location.city': 1 });
db.projects.createIndex({ status: 1, owner: 1 });

print('Database initialized successfully!');