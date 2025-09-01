import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

// Generate random string
export const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate UUID
export const generateUUID = () => {
  return uuidv4();
};

// Hash string using SHA256
export const hashString = str => {
  return crypto.createHash('sha256').update(str).digest('hex');
};

// Format date to ISO string
export const formatDate = date => {
  return new Date(date).toISOString();
};

// Get current timestamp
export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

// Convert string to slug
export const slugify = str => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Capitalize first letter
export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Validate email format
export const isValidEmail = email => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Validate phone number (Turkish format)
export const isValidPhone = phone => {
  const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Format phone number
export const formatPhone = phone => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('90')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('0')) {
    return `+9${cleaned}`;
  }
  return `+90${cleaned}`;
};

// Parse pagination parameters
export const parsePagination = query => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

// Calculate pagination info
export const calculatePagination = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    page,
    limit,
    total,
    pages: totalPages,
    hasNext,
    hasPrev,
  };
};

// Sanitize object (remove null/undefined values)
export const sanitizeObject = obj => {
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && typeof value !== 'undefined') {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

// Deep clone object
export const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = obj => {
  return Object.keys(obj).length === 0;
};

// Convert bytes to human readable format
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
