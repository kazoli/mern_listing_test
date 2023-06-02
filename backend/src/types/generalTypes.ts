import { ErrorRequestHandler, Response } from 'express';

// Types for express response locals
declare global {
  namespace Express {
    interface Locals {
      user: {
        _id: string;
        name: string;
        email: string;
        password: string;
        createdAt: NativeDate;
        updatedAt: NativeDate;
      };
    }
  }
}

// Type for error trigger
export type tErrorTrigger = { (res: Response, statusCode: number, message: string): void };

// Type for error handler
export type tErrorHandler = ErrorRequestHandler<
  Error,
  {},
  Response<
    Error & {
      statusCode: number;
    }
  >,
  {}
>;
