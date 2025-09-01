# TOZ Yapı API - Deployment Guide

## Production Deployment

### Prerequisites

- Docker and Docker Compose
- SSL certificates (for HTTPS)
- Domain name configured
- MongoDB instance (cloud or self-hosted)
- Environment variables configured

### Environment Variables

Create a `.env.production` file with:

```bash
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://your-mongo-host:27017/toz-yapi
JWT_SECRET=your-super-secret-production-jwt-key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=12
LOG_LEVEL=info
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### SSL Configuration

1. Place SSL certificates in `docker/ssl/`:
   - `cert.pem`
   - `key.pem`

2. Update `docker/nginx.conf` with your domain name

### Deployment Steps

1. **Clone repository:**
   ```bash
   git clone https://github.com/tozsolutions/toz-yapi-source.git
   cd toz-yapi-source
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.production
   # Edit .env.production with production values
   ```

3. **Deploy with Docker Compose:**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

4. **Verify deployment:**
   ```bash
   curl https://your-domain.com/health
   ```

### Monitoring

- **Health Check:** `/health`
- **Logs:** `docker-compose logs -f app`
- **Metrics:** Available through the logging system

### Backup Strategy

1. **Database Backup:**
   ```bash
   docker exec mongo_container mongodump --db toz-yapi --out /backup
   ```

2. **File Backup:**
   ```bash
   tar -czf uploads-backup.tar.gz uploads/
   ```

### Scaling

For high-traffic scenarios:

1. **Multiple app instances:**
   ```bash
   docker-compose up -d --scale app=3
   ```

2. **Load balancer configuration in nginx.conf**

3. **Database optimization and indexing**

### Security Checklist

- [ ] SSL/TLS certificates configured
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Regular security updates
- [ ] Monitoring and alerting setup

### Troubleshooting

**Application won't start:**
- Check environment variables
- Verify MongoDB connection
- Check Docker logs

**Database connection issues:**
- Verify MongoDB URI
- Check network connectivity
- Validate credentials

**Performance issues:**
- Check resource usage
- Review database queries
- Monitor request patterns

### Updates

1. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Rebuild and deploy:**
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

3. **Verify deployment:**
   ```bash
   curl https://your-domain.com/health
   ```