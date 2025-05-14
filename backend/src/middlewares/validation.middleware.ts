// src/middlewares/validation.middleware.ts
import { RequestHandler } from 'express';
import Joi from 'joi';

export function validate(schema: Joi.Schema): RequestHandler {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      res.status(400).json({
        message: 'Validation failed',
        error: error.details[0].message
      });
      return;
    }
    
    next();
  };
}