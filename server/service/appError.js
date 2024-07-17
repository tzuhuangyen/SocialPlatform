//取代原本的throw new Error
const appError = (httpStatus, errMessage, next) => {
  const error = new Error(errMessage);
  error.statusCode = httpStatus;
  error.isOperational = true;
  return error;
};

module.exports = appError;
