const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Handle Gemini API errors (placeholder check)
  if (err.message && err.message.includes('Gemini')) {
    statusCode = 502;
  }

  res.status(statusCode).json({
    error: message,
    code: statusCode,
  });
};

module.exports = errorHandler;
