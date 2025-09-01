# API Documentation

## Overview

Toz API Source provides a RESTful API for managing users and system information. The API follows REST conventions and returns JSON responses.

## Base URL

```
Development: http://localhost:3000
Production: https://api.tozsolutions.com
```

## Authentication

Currently, the API does not require authentication. Authentication middleware is prepared for future implementation.

## Content Type

All requests should include the following header:
```
Content-Type: application/json
```

## Rate Limiting

The API implements rate limiting:
- **Window**: 15 minutes
- **Max Requests**: 100 per IP address
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Error Handling

The API uses conventional HTTP response codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

Error Response Format:
```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## Pagination

List endpoints support pagination with query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

Response includes pagination metadata:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Health Check

### GET /health

Returns the health status of the API.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "environment": "development",
  "version": "1.0.0"
}
```

## User Management

### GET /api/users

Retrieve a list of users with pagination.

**Query Parameters:**
- `page` (optional) - Page number
- `limit` (optional) - Items per page

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```

### GET /api/users/:id

Retrieve a specific user by ID.

**Parameters:**
- `id` - User ID

**Response:**
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### POST /api/users

Create a new user.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}
```

**Response (201):**
```json
{
  "id": "2",
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### PUT /api/users/:id

Update an existing user.

**Parameters:**
- `id` - User ID

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "Updated Name",
  "email": "updated@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T01:00:00.000Z"
}
```

### DELETE /api/users/:id

Delete a user.

**Parameters:**
- `id` - User ID

**Response:** `204 No Content`

## System Information

### GET /api/v1/status

Get API status information.

**Response:**
```json
{
  "status": "online",
  "version": "1.0.0",
  "uptime": 3600,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### GET /api/v1/info

Get API information and available endpoints.

**Response:**
```json
{
  "name": "Toz API Source",
  "description": "Production-ready API for Toz Solutions",
  "version": "1.0.0",
  "author": "Toz Solutions",
  "documentation": "/api/docs",
  "endpoints": {
    "status": "/api/v1/status",
    "health": "/health",
    "users": "/api/users"
  }
}
```

## Validation Rules

### User Validation

- `name`: Required, non-empty string
- `email`: Required, valid email format, must be unique

## WebSocket Support

WebSocket support is planned for future releases to enable real-time features.

## Versioning

The API uses URL versioning:
- Current version: v1
- Future versions will be available at `/api/v2`, etc.

## SDKs and Client Libraries

Client libraries are planned for:
- JavaScript/TypeScript
- Python
- PHP
- Go

## Webhooks

Webhook support is planned for future releases to notify external systems of events.

## Examples

### cURL Examples

Get all users:
```bash
curl -X GET "http://localhost:3000/api/users" \
  -H "Content-Type: application/json"
```

Create a user:
```bash
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

### JavaScript Examples

```javascript
// Get all users
const response = await fetch('/api/users');
const data = await response.json();

// Create a user
const response = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com'
  })
});
```

## Support

For API support, please contact:
- Email: api-support@tozsolutions.com
- Documentation: http://localhost:3000/api/docs
- GitHub Issues: https://github.com/tozsolutions/toz-yapi-source/issues