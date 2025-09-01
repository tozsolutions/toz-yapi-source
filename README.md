# TOZ Yapı API

TOZ Yapı Construction Management API - Modern, production-ready API service for construction project management.

## 🚀 Features

- **Modern Architecture**: Built with Node.js and Express.js
- **Security First**: Comprehensive security middleware and best practices
- **Database Ready**: MongoDB integration with Mongoose ODM
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Testing**: Complete test suite with Jest
- **Code Quality**: ESLint and Prettier for consistent code style
- **CI/CD Ready**: GitHub Actions workflow included
- **Docker Support**: Containerized deployment
- **Monitoring**: Built-in logging and health checks
- **Production Ready**: Optimized for production deployment

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- MongoDB 5.0 or higher (for database functionality)
- Docker (optional, for containerized deployment)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/tozsolutions/toz-yapi-source.git
cd toz-yapi-source
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment configuration:
```bash
cp .env.example .env
```

4. Update environment variables in `.env` file with your configuration.

## 🔧 Development

### Start development server:
```bash
npm run dev
```

### Run tests:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code quality:
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## 🏗️ Production Deployment

### Using Node.js:
```bash
npm start
```

### Using Docker:
```bash
# Build image
npm run docker:build

# Run container
npm run docker:run

# Or use docker-compose
docker-compose up -d
```

## 📚 API Documentation

Once the server is running, visit:
- API Documentation: `http://localhost:3000/api-docs`
- Health Check: `http://localhost:3000/health`

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | `development` |
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/toz-yapi` |
| `JWT_SECRET` | JWT secret key | `your-secret-key` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `LOG_LEVEL` | Logging level | `info` |

## 📁 Project Structure

```
src/
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
├── config/         # Configuration files
└── server.js       # Application entry point

tests/              # Test files
docs/               # Documentation
docker/             # Docker configuration
.github/            # GitHub Actions workflows
```

## 🧪 Testing

The project includes comprehensive tests:
- Unit tests for services and utilities
- Integration tests for API endpoints
- Test coverage reporting

## 🔒 Security

Security features included:
- Helmet.js for HTTP headers security
- Rate limiting to prevent abuse
- CORS configuration
- Input validation
- JWT authentication
- Password hashing
- Environment variable validation

## 📊 Monitoring

Built-in monitoring features:
- Winston logging
- Health check endpoint
- Request logging with Morgan
- Error tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: [support@tozsolutions.com](mailto:support@tozsolutions.com)

## 🏢 TOZ Solutions

Visit [TOZ Solutions](https://tozsolutions.com) for more information about our construction technology solutions.