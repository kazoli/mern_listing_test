import { Response } from 'express';

// Type for error trigger
export type tErrorTrigger = { (res: Response, statusCode: number, message: string): void };

// Type for error handler
export type tErrorHandler = {
  (
    err: Error,
    res: Response<
      Error & {
        statusCode: number;
      }
    >,
  ): void;
};
