const request = require('supertest');
const app = require('../src/server');

describe('User API Endpoints', () => {
  describe('GET /api/users', () => {
    test('should return users list with pagination', async () => {
      const response = await request(app).get('/api/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.pagination).toHaveProperty('page');
      expect(response.body.pagination).toHaveProperty('limit');
      expect(response.body.pagination).toHaveProperty('total');
    });

    test('should handle pagination parameters', async () => {
      const response = await request(app).get('/api/users?page=1&limit=1');
      
      expect(response.status).toBe(200);
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(1);
      expect(response.body.data.length).toBeLessThanOrEqual(1);
    });
  });

  describe('GET /api/users/:id', () => {
    test('should return user by ID', async () => {
      const response = await request(app).get('/api/users/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/users/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/users', () => {
    test('should create new user with valid data', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
    });

    test('should return 400 for invalid data', async () => {
      const invalidUser = {
        name: '',
        email: 'invalid-email'
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('should return 400 for duplicate email', async () => {
      const duplicateUser = {
        name: 'Duplicate User',
        email: 'john.doe@example.com' // This email already exists in mock data
      };

      const response = await request(app)
        .post('/api/users')
        .send(duplicateUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/users/:id', () => {
    test('should update existing user', async () => {
      const updateData = {
        name: 'Updated Name'
      };

      const response = await request(app)
        .put('/api/users/1')
        .send(updateData);
      
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updateData.name);
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .put('/api/users/999')
        .send({ name: 'Test' });
      
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/users/:id', () => {
    test('should return 404 for non-existent user', async () => {
      const response = await request(app).delete('/api/users/999');
      
      expect(response.status).toBe(404);
    });
  });
});