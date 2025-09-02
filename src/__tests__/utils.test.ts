import { sendSuccess, sendError } from '../utils/response';
import { Response } from 'express';

describe('Response Utils', () => {
  let mockRes: Partial<Response>;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;
  
  beforeEach(() => {
    mockStatus = jest.fn().mockReturnThis();
    mockJson = jest.fn().mockReturnThis();
    mockRes = {
      status: mockStatus,
      json: mockJson,
    };
  });
  
  describe('sendSuccess', () => {
    it('should send success response with default status 200', () => {
      const message = 'Success message';
      const data = { test: 'data' };
      
      sendSuccess(mockRes as Response, message, data);
      
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        message,
        data,
        timestamp: expect.any(String),
      });
    });
    
    it('should send success response with custom status', () => {
      const message = 'Created';
      const data = { id: 1 };
      const statusCode = 201;
      
      sendSuccess(mockRes as Response, message, data, statusCode);
      
      expect(mockStatus).toHaveBeenCalledWith(statusCode);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        message,
        data,
        timestamp: expect.any(String),
      });
    });
  });
  
  describe('sendError', () => {
    it('should send error response with default status 500', () => {
      const message = 'Error message';
      const error = 'Detailed error';
      
      sendError(mockRes as Response, message, error);
      
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        success: false,
        message,
        error,
        timestamp: expect.any(String),
      });
    });
    
    it('should send error response with custom status', () => {
      const message = 'Not found';
      const statusCode = 404;
      
      sendError(mockRes as Response, message, undefined, statusCode);
      
      expect(mockStatus).toHaveBeenCalledWith(statusCode);
      expect(mockJson).toHaveBeenCalledWith({
        success: false,
        message,
        error: undefined,
        timestamp: expect.any(String),
      });
    });
  });
});