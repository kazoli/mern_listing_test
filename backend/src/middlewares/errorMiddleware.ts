import { tErrorHandler, tErrorTrigger } from '../types/generalTypes';

export const errorTrigger: tErrorTrigger = (res, statusCode, message) => {
  res.status(statusCode);
  throw new Error(message);
};

export const errorHandler: tErrorHandler = (err, res) => {
  // prettier-ignore
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    statusCode: statusCode,
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
