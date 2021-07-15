import { Request, Response } from 'express';
import { ValidationError } from '../../../errors/validation.error';

export const errorMiddleware = (error: ValidationError, request: Request, response: Response): void => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    status,
    message
  });
};
