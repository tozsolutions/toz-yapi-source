# API Documentation

## Authentication

All API endpoints except `/health`, `/`, and authentication endpoints require a valid JWT token.

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Endpoints

### Authentication

#### POST /api/v1/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### POST /api/v1/auth/login
Login with credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### GET /api/v1/auth/profile
Get current user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Projects

#### GET /api/v1/projects
Get all projects (paginated).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `status` (optional): Filter by status (planning, active, completed, cancelled)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "project_id",
      "name": "Residential Complex A",
      "description": "Modern residential complex",
      "location": {
        "address": "123 Main St",
        "city": "Istanbul",
        "coordinates": {
          "lat": 41.0082,
          "lng": 28.9784
        }
      },
      "status": "active",
      "startDate": "2023-01-01T00:00:00.000Z",
      "endDate": "2024-12-31T00:00:00.000Z",
      "budget": 1000000,
      "owner": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### POST /api/v1/projects
Create a new project (Admin/Manager only).

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description",
  "location": {
    "address": "123 Main St",
    "city": "Istanbul",
    "coordinates": {
      "lat": 41.0082,
      "lng": 28.9784
    }
  },
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2024-12-31T00:00:00.000Z",
  "budget": 1000000,
  "tags": ["residential", "modern"]
}
```

#### GET /api/v1/projects/:id
Get project by ID.

#### PUT /api/v1/projects/:id
Update project (Admin/Manager/Owner only).

#### DELETE /api/v1/projects/:id
Delete project (Admin only).

### Users

#### GET /api/v1/users
Get all users (Admin/Manager only).

#### GET /api/v1/users/:id
Get user by ID.

#### PUT /api/v1/users/:id
Update user.

#### DELETE /api/v1/users/:id
Delete user (Admin only).

## Error Responses

All errors return the following format:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Internal Server Error

## Rate Limiting

- **Default:** 100 requests per 15 minutes per IP
- **Burst:** 20 requests allowed in quick succession
- Headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## Pagination

All list endpoints support pagination:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

Response includes pagination metadata:

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```