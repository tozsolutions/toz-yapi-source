import { Response } from 'express';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200
): Response<ApiResponse<T>> => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  error?: string,
  statusCode: number = 500
): Response<ApiResponse> => {
  const response: ApiResponse = {
    success: false,
    message,
    error,
    timestamp: new Date().toISOString(),
  };
  
  return res.status(statusCode).json(response);
};