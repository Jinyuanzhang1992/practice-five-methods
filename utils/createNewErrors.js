const createNewErrors = (description, statusCode, validation, data = null) => {
  const error = new Error(description);
  error.status = statusCode;
  error.data = data;
  error.type = validation;
  return error;
};

module.exports = createNewErrors;
