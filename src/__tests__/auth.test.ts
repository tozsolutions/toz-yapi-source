import request from 'supertest';
import express from 'express';
import { authRoutes } from '../routes/auth';
import { UserModel } from '../models/User';
import { hashPassword } from '../utils/auth';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      
      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user.email).toBe(userData.email);
    });
    
    it('should not register user with existing email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      
      // Create user first
      await UserModel.create({
        ...userData,
        password: await hashPassword(userData.password),
      });
      
      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(409);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User already exists with this email');
    });
    
    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({})
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });
  });
  
  describe('POST /auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      await UserModel.create({
        email: 'test@example.com',
        name: 'Test User',
        password: await hashPassword('password123'),
        role: 'user',
      });
    });
    
    it('should login with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };
      
      const response = await request(app)
        .post('/auth/login')
        .send(loginData)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
    });
    
    it('should not login with invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      
      const response = await request(app)
        .post('/auth/login')
        .send(loginData)
        .expect(401);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });
    
    it('should not login with non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };
      
      const response = await request(app)
        .post('/auth/login')
        .send(loginData)
        .expect(401);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });
});