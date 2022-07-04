const errorTrigger = (res, statusCode, message) => {
  res.status(statusCode);
  throw new Error(message);
}

const errorHandler = (err, req, res, next) => {
  // prettier-ignore
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    statusCode: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorTrigger,
  errorHandler,
};
