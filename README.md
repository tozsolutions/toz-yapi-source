# TOZ YAPI Source

[![CI/CD Pipeline](https://github.com/tozsolutions/toz-yapi-source/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/tozsolutions/toz-yapi-source/actions/workflows/ci-cd.yml)
[![Security Audit](https://github.com/tozsolutions/toz-yapi-source/actions/workflows/security.yml/badge.svg)](https://github.com/tozsolutions/toz-yapi-source/actions/workflows/security.yml)
[![codecov](https://codecov.io/gh/tozsolutions/toz-yapi-source/branch/main/graph/badge.svg)](https://codecov.io/gh/tozsolutions/toz-yapi-source)

Production-ready YAPI (Yet Another Package Installer) source server built with Node.js, TypeScript, Express, and MongoDB.

## 🚀 Features

- **RESTful API** for managing YAPI sources
- **Authentication & Authorization** with JWT tokens
- **MongoDB** integration with Mongoose ODM
- **TypeScript** for type safety and better developer experience
- **Comprehensive Testing** with Jest and Supertest
- **Docker Support** with multi-stage builds
- **CI/CD Pipeline** with GitHub Actions
- **Security Features** including helmet, rate limiting, and CORS
- **Health Checks** and monitoring endpoints
- **Production-ready** configuration and error handling

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- MongoDB 7.x or higher
- Docker (optional)

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/tozsolutions/toz-yapi-source.git
   cd toz-yapi-source
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:7
   
   # Or install MongoDB locally
   # Follow instructions at https://docs.mongodb.com/manual/installation/
   ```

5. **Run the application**
   ```bash
   # Development mode with hot reload
   npm run dev
   
   # Production build
   npm run build
   npm start
   ```

### Docker Deployment

1. **Using Docker Compose** (Recommended)
   ```bash
   docker-compose up -d
   ```

2. **Using Docker directly**
   ```bash
   # Build the image
   npm run docker:build
   
   # Run the container
   npm run docker:run
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Application environment | `development` | No |
| `PORT` | Server port | `3000` | No |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/toz-yapi-source` | No |
| `JWT_SECRET` | JWT signing secret | - | **Yes** (Production) |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` | No |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000` | No |

See `.env.example` for all available configuration options.

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

#### YAPI Sources
- `GET /api/v1/yapi/sources` - Get all sources (public)
- `GET /api/v1/yapi/sources/:id` - Get source by ID (public)
- `POST /api/v1/yapi/sources` - Create new source (authenticated)
- `PUT /api/v1/yapi/sources/:id` - Update source (authenticated)
- `DELETE /api/v1/yapi/sources/:id` - Delete source (authenticated)

#### Health & Monitoring
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system information
- `GET /health/live` - Liveness probe
- `GET /health/ready` - Readiness probe

### Example Requests

#### Register User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }'
```

#### Create YAPI Source
```bash
curl -X POST http://localhost:3000/api/v1/yapi/sources \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "name": "My API Source",
    "description": "API documentation source",
    "url": "https://api.example.com/swagger.json",
    "type": "swagger",
    "tags": ["api", "documentation"]
  }'
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🔍 Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## 🐳 Docker

### Building the Image
```bash
docker build -t toz-yapi-source .
```

### Running with Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🚀 Deployment

### Production Checklist

- [ ] Set strong `JWT_SECRET` in production
- [ ] Configure proper `MONGODB_URI` for production database
- [ ] Set `NODE_ENV=production`
- [ ] Configure appropriate `CORS_ORIGIN`
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy for MongoDB
- [ ] Set up SSL/TLS certificates
- [ ] Configure load balancer if needed

### Environment Setup

1. **Staging**: Uses `develop` branch, deployed automatically
2. **Production**: Uses `main` branch, deployed automatically with approvals

## 📊 Monitoring

The application includes built-in health checks and monitoring endpoints:

- **Health Check**: `/health` - Basic application health
- **Detailed Health**: `/health/detailed` - System metrics and database status
- **Liveness Probe**: `/health/live` - For Kubernetes liveness checks
- **Readiness Probe**: `/health/ready` - For Kubernetes readiness checks

## 🔒 Security

- **Helmet**: Security headers configuration
- **CORS**: Cross-origin resource sharing protection
- **Rate Limiting**: Request rate limiting to prevent abuse
- **Input Validation**: Joi schema validation for all inputs
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript and ESLint configurations
- Write tests for new features
- Update documentation as needed
- Ensure all CI checks pass

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Contact: TOZ Solutions

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.