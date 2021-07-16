import { Request, Response } from 'express';
import { HttpError } from '../../../errors/Http.error';
import { ValidationError } from '../../../errors/Validation.error';

export const errorMiddleware = (error: ValidationError | HttpError, request: Request, response: Response): void => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    status,
    message
  });
};
