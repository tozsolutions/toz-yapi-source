# TOZ YAPI - Modern Node.js API Projesi

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-7+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

TOZ YAPI, modern web uygulamaları için tasarlanmış, production-ready Node.js API projesidir. Bu proje, en iyi güvenlik uygulamaları, performans optimizasyonları ve geliştirici deneyimi göz önünde bulundurularak geliştirilmiştir.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknolojiler](#teknolojiler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [API Dokümantasyonu](#api-dokümantasyonu)
- [Docker ile Kullanım](#docker-ile-kullanım)
- [Geliştirme](#geliştirme)
- [Testing](#testing)
- [Deployment](#deployment)
- [Katkıda Bulunma](#katkıda-bulunma)

## ✨ Özellikler

### 🔒 Güvenlik
- JWT tabanlı kimlik doğrulama
- Rate limiting ve DDoS koruması
- Input validation ve sanitization
- Security headers (Helmet.js)
- CORS yapılandırması
- Şifre hash'leme (bcrypt)
- Account lockout protection

### 🚀 Performans
- Database connection pooling
- Response compression
- Request logging ve monitoring
- Memory usage optimization
- Efficient error handling

### 📊 Monitoring ve Logging
- Winston tabanlı logging sistemi
- Health check endpoints
- Detailed system metrics
- Error tracking ve reporting

### 🔧 Developer Experience
- Hot reload (nodemon)
- ESLint ve Prettier entegrasyonu
- Comprehensive test suite
- API dokümantasyonu (Swagger)
- Docker support

### 🏗️ Architecture
- MVC pattern implementation
- Modular route structure
- Middleware-based architecture
- Environment-based configuration

## 🛠️ Teknolojiler

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Güvenlik
- **Helmet** - Security headers
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT implementation
- **express-rate-limit** - Rate limiting
- **express-validator** - Input validation

### Development Tools
- **nodemon** - Development server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Supertest** - HTTP assertions

### Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm 9+
- MongoDB 7+
- Docker (opsiyonel)

### Hızlı Başlangıç

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/tozsolutions/toz-yapi-source.git
cd toz-yapi-source
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Environment dosyasını oluşturun:**
```bash
cp .env.example .env
```

4. **Environment değişkenlerini yapılandırın:**
```bash
# Gerekli değişkenleri .env dosyasında düzenleyin
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/toz-yapi-dev
JWT_SECRET=your-super-secret-jwt-key
```

5. **Veritabanını başlatın:**
```bash
# MongoDB'yi başlatın (yerel kurulum)
mongod

# veya Docker ile:
docker run -d -p 27017:27017 --name mongodb mongo:7
```

6. **Uygulamayı başlatın:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🚀 Kullanım

### Development Server
```bash
npm run dev
```
Uygulama http://localhost:3000 adresinde çalışacaktır.

### API Endpoints

#### Health Check
```
GET /health - Basic health check
GET /health/detailed - Detailed system information
GET /health/ready - Readiness probe
GET /health/live - Liveness probe
```

#### Authentication
```
POST /api/auth/register - Kullanıcı kaydı
POST /api/auth/login - Kullanıcı girişi
```

#### Users
```
GET /api/users - Tüm kullanıcıları listele (Auth required)
GET /api/users/:id - Kullanıcı detayı (Auth required)
GET /api/users/profile - Profil bilgisi (Auth required)
```

### Example Request

**Kullanıcı Kaydı:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**Authentication:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

## 📚 API Dokümantasyonu

API dokümantasyonu Swagger UI ile otomatik olarak oluşturulur.

**Dokümantasyona erişim:**
- Development: http://localhost:3000/api-docs
- Production: https://your-domain.com/api-docs

## 🐳 Docker ile Kullanım

### Tek Container
```bash
# Image build et
docker build -t toz-yapi-source .

# Container'ı çalıştır
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/toz-yapi \
  -e JWT_SECRET=your-secret \
  toz-yapi-source
```

### Docker Compose (Önerilen)
```bash
# Tüm servisleri başlat
docker-compose up -d

# Logları takip et
docker-compose logs -f

# Servisleri durdur
docker-compose down
```

**Servisler:**
- API: http://localhost:3000
- MongoDB: localhost:27017
- Mongo Express: http://localhost:8081
- Redis: localhost:6379
- Nginx: http://localhost:80

## 🔧 Geliştirme

### Kod Kalitesi
```bash
# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
```

### Environment Yapılandırması

```bash
# Development
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/toz-yapi-dev

# Production
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://your-production-db/toz-yapi
JWT_SECRET=your-super-secure-production-secret
```

### Logging

Uygulama Winston kullanarak kapsamlı logging yapar:

- **Console logs**: Development için
- **File logs**: Production için
- **Error logs**: Ayrı dosyada hata logları
- **Request logs**: HTTP request tracking

Log dosyaları `logs/` dizininde saklanır.

## 🧪 Testing

### Test Çalıştırma
```bash
# Tüm testler
npm test

# Watch mode
npm run test:watch

# Coverage raporu
npm run test:coverage
```

### Test Türleri
- **Unit Tests**: Tekil fonksiyon testleri
- **Integration Tests**: API endpoint testleri
- **Health Check Tests**: Sistem sağlığı testleri

## 🚀 Deployment

### Production Build
```bash
# Production dependencies
npm ci --only=production

# Start production server
NODE_ENV=production npm start
```

### Environment Variables (Production)
```bash
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://your-production-db/toz-yapi
JWT_SECRET=super-secure-production-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

### Health Checks
Kubernetes için health check endpoint'leri:
- Liveness: `/health/live`
- Readiness: `/health/ready`

### CI/CD Pipeline

GitHub Actions ile otomatik deployment:
1. Code quality check (ESLint, Prettier)
2. Security audit
3. Unit tests
4. Docker build
5. Integration tests
6. Staging deployment
7. Production deployment

## 📁 Proje Yapısı

```
toz-yapi-source/
├── src/
│   ├── config/          # Yapılandırma dosyaları
│   ├── controllers/     # Route handler'ları
│   ├── middlewares/     # Express middleware'leri
│   ├── models/          # Database modelleri
│   ├── routes/          # API route tanımları
│   ├── services/        # Business logic
│   ├── utils/           # Yardımcı fonksiyonlar
│   └── app.js           # Ana uygulama dosyası
├── tests/
│   ├── unit/            # Unit testler
│   ├── integration/     # Integration testler
│   └── setup.js         # Test setup
├── docker/              # Docker yapılandırmaları
├── scripts/             # Utility scriptleri
├── docs/                # Dokümantasyon
├── logs/                # Log dosyaları
├── .github/workflows/   # CI/CD pipeline
└── package.json
```

## 🔐 Güvenlik Önerileri

### Production Checklist
- [ ] Strong JWT secret kullanın
- [ ] Environment variables'ı güvence altına alın
- [ ] HTTPS kullanın
- [ ] Rate limiting yapılandırın
- [ ] Input validation aktif olsun
- [ ] Security headers ekleyin
- [ ] Database bağlantısını güvenlik altına alın
- [ ] Error messages'da sensitive bilgi paylaşmayın
- [ ] Logging ve monitoring aktif olsun

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

### Development Guidelines
- ESLint kurallarına uyun
- Test yazın
- Commit mesajlarını açıklayıcı yazın
- Dokümantasyonu güncelleyin

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

**TOZ Solutions**
- Email: contact@tozsolutions.com
- GitHub: [@tozsolutions](https://github.com/tozsolutions)

## 🙏 Teşekkürler

- Express.js ekibine
- MongoDB ekibine
- Tüm açık kaynak katkıcılarına

---

**Production-ready API projesi için TOZ YAPI'yı seçtiğiniz için teşekkürler! 🚀**