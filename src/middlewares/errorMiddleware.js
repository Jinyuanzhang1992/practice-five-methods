const createLogger = require("../utils/logger");
const logger = createLogger(__filename);

const errorHandler = (err, req, res, next) => {
  const defaultError = {
    status: 500,
    message: "Internal Server Error",
    stack: "No stack trace available",
    data: "No data available",
  };

  let { status, message, stack, data } = defaultError;

  if (err.type) {
    status = err.status || defaultError.status;
    message = err.message || defaultError.message;
    stack = err.stack || defaultError.stack;

    if (err.type === "validation") {
      data = err.data || "No data available";
    }

    if (err.type === "axios") {
      status = err.response?.status || defaultError.status;
      message = err.response?.statusText || defaultError.message;
    }

    res.status(status).json({
      message,
      status,
      ...(err.type === "validation" && { data }),
    });

    logger.error(`Error fetching news: ${err.message}`, {
      status,
      stack: process.env.NODE_ENV === "production" ? undefined : stack,
      type: err.type,
      ...(err.type === "validation" && { data }),
    });
  } else {
    res.status(defaultError.status).json({
      message: defaultError.message,
      status: defaultError.status,
    });

    logger.error(`Error fetching news: ${defaultError.message}`, {
      status: defaultError.status,
      stack:
        process.env.NODE_ENV === "production" ? undefined : defaultError.stack,
    });
  }
};

module.exports = errorHandler;
