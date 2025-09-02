import { Request, Response } from 'express';
import { sendError } from '../utils/response';

export const notFoundHandler = (req: Request, res: Response): void => {
  sendError(
    res,
    `Route ${req.originalUrl} not found`,
    undefined,
    404
  );
};