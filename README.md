# TOZ Yapı Source - Construction Management API

A comprehensive construction and building management API application built with Node.js, Express.js, and MongoDB.

## 🏗️ Features

- **User Management**: User registration, authentication, and profile management
- **Project Management**: Create, update, and track construction projects
- **Team Management**: Assign team members with different roles
- **Progress Tracking**: Monitor project progress with milestones
- **Document Management**: Upload and manage project documents
- **RESTful API**: Clean and intuitive API design
- **Security**: JWT authentication, rate limiting, input validation
- **Production Ready**: Docker support, PM2 configuration, monitoring

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB 6.0+
- Redis (optional, for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tozsolutions/toz-yapi-source.git
   cd toz-yapi-source
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the application**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

### Using Docker

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

This will start:
- Application server on port 3000
- MongoDB on port 27017
- Redis on port 6379
- Nginx reverse proxy on port 80

## 📚 API Documentation

### Base URL
```
Development: http://localhost:3000
Production: https://your-domain.com
```

### Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Core Endpoints

#### Health Check
- `GET /health` - Basic health check
- `GET /health/db` - Database connection status
- `GET /health/info` - System information

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update user profile

#### Projects
- `GET /api/projects` - Get all projects (with filtering)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/:id/status` - Get project status
- `PUT /api/projects/:id/status` - Update project status

### Example Requests

#### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "password": "password123",
    "phone": "+905551234567",
    "company": "TOZ İnşaat",
    "position": "Proje Müdürü"
  }'
```

#### Create Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "name": "Lüks Villa Projesi",
    "description": "Modern tasarım lüks villa projesi",
    "type": "residential",
    "location": {
      "address": "Çayyolu Mahallesi, Ankara",
      "city": "Ankara",
      "district": "Çankaya"
    },
    "budget": {
      "estimated": 1500000,
      "currency": "TRY"
    },
    "timeline": {
      "startDate": "2024-01-15",
      "endDate": "2024-12-15"
    },
    "client": {
      "name": "Mehmet Demir",
      "email": "mehmet@example.com",
      "phone": "+905559876543"
    }
  }'
```

## 🏗️ Project Structure

```
src/
├── app.js              # Application entry point
├── config/             # Configuration files
│   ├── database.js     # Database connection
│   └── logger.js       # Logging configuration
├── controllers/        # Route controllers
│   ├── authController.js
│   └── projectController.js
├── middleware/         # Custom middleware
│   ├── auth.js         # Authentication middleware
│   ├── errorHandler.js # Error handling
│   └── notFound.js     # 404 handler
├── models/             # Database models
│   ├── User.js
│   └── Project.js
├── routes/             # Route definitions
│   ├── api.js
│   ├── auth.js
│   ├── health.js
│   └── projects.js
└── utils/              # Utility functions

tests/                  # Test files
docs/                   # Documentation
scripts/                # Database scripts
logs/                   # Application logs
uploads/                # File uploads
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/toz-yapi-db
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Database Setup

The application automatically creates necessary indexes when connecting to MongoDB. For manual setup:

```bash
npm run db:setup
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

## 📦 Deployment

### Production Deployment

1. **Using PM2**
   ```bash
   npm install -g pm2
   npm run prod
   ```

2. **Using Docker**
   ```bash
   docker build -t toz-yapi-api .
   docker run -p 3000:3000 toz-yapi-api
   ```

3. **Using Docker Compose**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Performance Optimization

- Use Redis for session storage and caching
- Enable gzip compression
- Configure proper database indexes
- Use CDN for static files
- Monitor with tools like New Relic or DataDog

## 🔐 Security

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation
- CORS configuration
- Security headers with Helmet
- SQL injection prevention

## 📊 Monitoring

### Health Checks

The application provides several health check endpoints:

- `/health` - Basic application health
- `/health/db` - Database connectivity
- `/health/info` - System information

### Logging

Logs are written to:
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only
- Console output in development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Follow conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Contact: support@tozsolutions.com
- Documentation: [docs.tozsolutions.com](https://docs.tozsolutions.com)

## 🔗 Related Projects

- [TOZ Yapı Frontend](https://github.com/tozsolutions/toz-yapi-frontend)
- [TOZ Yapı Mobile](https://github.com/tozsolutions/toz-yapi-mobile)

---

**TOZ Solutions** - Building the future, one project at a time.