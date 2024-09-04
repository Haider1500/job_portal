class ErrorHandler extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";
  if (error.message === "CastError") {
    const message = `Invalid ${error.path}`;
    error = new ErrorHandler(message, 400);
  }
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
    error = new ErrorHandler(message, 400);
  }

  if (error.message === "JsonWebTokenError") {
    const message = "JsonWebToken is invalid, Try again";
    error = new ErrorHandler(message, 400);
  }

  if (error.message === "TokenExpiredError") {
    const message = "JsonWebToken is expired, Try again";
    error = new ErrorHandler(message, 400);
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

module.exports = { errorMiddleware, ErrorHandler };
