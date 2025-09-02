# Toz API Source

Production-ready REST API built with Node.js and Express for Toz Solutions.

## Features

- 🚀 **Production Ready**: Comprehensive error handling, logging, and monitoring
- 🔒 **Security First**: CORS, Helmet, rate limiting, and security middleware
- 📝 **API Documentation**: Swagger/OpenAPI documentation
- 🧪 **Test Coverage**: Jest testing framework with comprehensive test suite
- 🐳 **Containerized**: Docker and Docker Compose support
- 🔄 **CI/CD**: GitHub Actions workflow for automated testing and deployment
- 📊 **Monitoring**: Health checks and structured logging
- 🎯 **Code Quality**: ESLint, Prettier, and pre-commit hooks

## Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Docker (optional)

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

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Visit the API**
   - API: http://localhost:3000
   - Documentation: http://localhost:3000/api/docs
   - Health Check: http://localhost:3000/health

### Docker Development

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the API**
   - API: http://localhost:3000
   - Nginx proxy: http://localhost:80

## API Endpoints

### System Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/api` | API v1 information |
| GET | `/api/docs` | Swagger documentation |

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users (paginated) |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### API v1 Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/status` | API status |
| GET | `/api/v1/info` | API information |

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Project Structure

```
toz-yapi-source/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Custom middleware
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Main application file
├── tests/               # Test files
├── docs/                # Documentation
├── .github/             # GitHub workflows
├── logs/                # Log files (created at runtime)
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── nginx.conf           # Nginx configuration
└── README.md            # This file
```

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DATABASE_URL=sqlite://./database.sqlite
DB_MAX_CONNECTIONS=10
DB_CONNECTION_TIMEOUT=60000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# CORS Settings
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
LOG_FORMAT=combined

# File Upload
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf

# API Settings
API_BASE_URL=http://localhost:3000
```

## Production Deployment

### Docker Deployment

1. **Build the production image**
   ```bash
   docker build -t toz-api-source .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 \
     -e NODE_ENV=production \
     -e PORT=3000 \
     toz-api-source
   ```

### Docker Compose Deployment

```bash
docker-compose -f docker-compose.yml up -d
```

### Environment-specific Considerations

#### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure proper `JWT_SECRET`
- [ ] Set up database connection
- [ ] Configure CORS origins
- [ ] Set up reverse proxy (Nginx)
- [ ] Configure SSL/TLS certificates
- [ ] Set up monitoring and alerting
- [ ] Configure log rotation
- [ ] Set up backup strategies
- [ ] Configure environment-specific rate limits

## Security Features

- **CORS Protection**: Configurable allowed origins
- **Helmet.js**: Security headers
- **Rate Limiting**: Configurable request limits
- **Input Validation**: Express-validator for request validation
- **Error Handling**: Centralized error handling with proper logging
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection

## Monitoring and Logging

- **Health Checks**: `/health` endpoint for monitoring
- **Structured Logging**: Winston logger with multiple transports
- **Error Tracking**: Comprehensive error logging and handling
- **Performance Metrics**: Request timing and performance monitoring

## API Documentation

The API documentation is automatically generated using Swagger/OpenAPI and is available at `/api/docs` when the server is running.

### Key Features:
- Interactive API explorer
- Request/response examples
- Schema validation
- Authentication documentation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (ESLint + Prettier)
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run build` | Build for production |
| `npm run health` | Check API health |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact:
- Email: info@tozsolutions.com
- Documentation: [API Docs](http://localhost:3000/api/docs)
- Issues: [GitHub Issues](https://github.com/tozsolutions/toz-yapi-source/issues)

## Changelog

### Version 1.0.0
- Initial release
- Basic CRUD operations for users
- Authentication and authorization framework
- Docker containerization
- CI/CD pipeline
- Comprehensive testing
- API documentation
- Production-ready configuration