import request from 'supertest';
import express from 'express';
import { healthRoutes } from '../routes/health';
import { config } from '../config/config';

const app = express();
app.use('/health', healthRoutes);

describe('Health Routes', () => {
  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Service is healthy');
      expect(response.body.data).toHaveProperty('status');
      expect(response.body.data).toHaveProperty('timestamp');
      expect(response.body.data).toHaveProperty('uptime');
    });
  });
  
  describe('GET /health/detailed', () => {
    it('should return detailed health information', async () => {
      const response = await request(app)
        .get('/health/detailed')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('system');
      expect(response.body.data).toHaveProperty('database');
      expect(response.body.data).toHaveProperty('memory');
    });
  });
  
  describe('GET /health/live', () => {
    it('should return alive status', async () => {
      const response = await request(app)
        .get('/health/live')
        .expect(200);
      
      expect(response.body.status).toBe('alive');
    });
  });
  
  describe('GET /health/ready', () => {
    it('should return readiness status', async () => {
      const response = await request(app)
        .get('/health/ready');
      
      // Response can be 200 or 503 depending on database connection
      expect([200, 503]).toContain(response.status);
      expect(response.body).toHaveProperty('status');
    });
  });
});