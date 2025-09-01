export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface YapiSource {
  _id: string;
  name: string;
  description?: string;
  url: string;
  type: 'swagger' | 'openapi' | 'postman' | 'insomnia';
  version?: string;
  tags: string[];
  isActive: boolean;
  authConfig: {
    type: 'none' | 'basic' | 'bearer' | 'apikey';
    credentials?: Record<string, unknown>;
  };
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastSyncAt?: Date;
  syncStatus: 'pending' | 'syncing' | 'success' | 'failed';
}

export interface CreateYapiSourceData {
  name: string;
  description?: string;
  url: string;
  type: 'swagger' | 'openapi' | 'postman' | 'insomnia';
  version?: string;
  tags?: string[];
  isActive?: boolean;
  authConfig?: {
    type: 'none' | 'basic' | 'bearer' | 'apikey';
    credentials?: Record<string, unknown>;
  };
}

export interface UpdateYapiSourceData {
  name?: string;
  description?: string;
  url?: string;
  type?: 'swagger' | 'openapi' | 'postman' | 'insomnia';
  version?: string;
  tags?: string[];
  isActive?: boolean;
  authConfig?: {
    type: 'none' | 'basic' | 'bearer' | 'apikey';
    credentials?: Record<string, unknown>;
  };
}