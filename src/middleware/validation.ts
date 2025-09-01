import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { sendError } from '../utils/response';

type ValidationTarget = 'body' | 'query' | 'params';

interface ValidationOptions {
  allowUnknown?: boolean;
  stripUnknown?: boolean;
}

export const validate = (
  schema: Joi.ObjectSchema,
  target: ValidationTarget = 'body',
  options: ValidationOptions = {}
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[target], {
      abortEarly: false,
      allowUnknown: options.allowUnknown || false,
      stripUnknown: options.stripUnknown || true,
    });
    
    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      
      sendError(res, 'Validation failed', errorMessage, 400);
      return;
    }
    
    req[target] = value;
    next();
  };
};