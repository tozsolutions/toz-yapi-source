const request = require('supertest');
const app = require('../src/app');

describe('Health Routes', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('uptime');
      expect(res.body.data).toHaveProperty('message', 'OK');
      expect(res.body.data).toHaveProperty('timestamp');
    });
  });

  describe('GET /health/info', () => {
    it('should return system information', async () => {
      const res = await request(app)
        .get('/health/info')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('uptime');
      expect(res.body.data).toHaveProperty('memory');
      expect(res.body.data).toHaveProperty('version');
      expect(res.body.data).toHaveProperty('platform');
    });
  });

  describe('GET /health/db', () => {
    it('should return database health status', async () => {
      const res = await request(app)
        .get('/health/db')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('state');
    });
  });
});