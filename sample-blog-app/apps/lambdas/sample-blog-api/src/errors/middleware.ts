import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { Container } from 'inversify';
import { ErrorCodes, ErrorDescriptions } from './error-codes';
import { AppError } from './app-error';

export function withErrorHandler(container: Container): ErrorRequestHandler {
  return (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    const error = {
      errorCode: err.errorCode,
      description: err.message,
    };

    const serverError = {
      errorCode: ErrorCodes.ServerError,
      description: ErrorDescriptions.ServerError,
    };

    switch (err.errorCode) {
      case ErrorCodes.PostNotFoundError:
        res.status(404).json({ error: { ...error } });
        break;
      default:
        res.status(500).json({ error: { ...serverError } });
    }
  };
}
