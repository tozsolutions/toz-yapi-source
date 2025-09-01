import Joi from 'joi';

// Auth schemas
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required',
  }),
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 50 characters',
    'any.required': 'Name is required',
  }),
  role: Joi.string().valid('user', 'admin').default('user'),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

// YAPI Source schemas
export const createYapiSourceSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.min': 'Source name must be at least 3 characters long',
    'string.max': 'Source name cannot exceed 100 characters',
    'any.required': 'Source name is required',
  }),
  description: Joi.string().max(500).optional(),
  url: Joi.string().uri().required().messages({
    'string.uri': 'Please provide a valid URL',
    'any.required': 'Source URL is required',
  }),
  type: Joi.string().valid('swagger', 'openapi', 'postman', 'insomnia').required().messages({
    'any.only': 'Source type must be one of: swagger, openapi, postman, insomnia',
    'any.required': 'Source type is required',
  }),
  version: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  isActive: Joi.boolean().default(true),
  authConfig: Joi.object({
    type: Joi.string().valid('none', 'basic', 'bearer', 'apikey').default('none'),
    credentials: Joi.object().optional(),
  }).optional(),
});

export const updateYapiSourceSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional(),
  url: Joi.string().uri().optional(),
  type: Joi.string().valid('swagger', 'openapi', 'postman', 'insomnia').optional(),
  version: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  isActive: Joi.boolean().optional(),
  authConfig: Joi.object({
    type: Joi.string().valid('none', 'basic', 'bearer', 'apikey').optional(),
    credentials: Joi.object().optional(),
  }).optional(),
});