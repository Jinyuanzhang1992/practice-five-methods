const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  let status; // = err.status || 500;
  let message; // = err.message || "Internal Server Error";
  let stack; // = err.stack || "No stack trace available";
  let data; //  = err.data || "No data available";

  if (err.type === "validation") {
    status = err.status || 500;
    message = err.message || "Internal Server Error";
    data = err.data || "No data available";
    stack = err.stack || "No stack trace available";
    res.status(status).json({
      message,
      status,
      data,
      stack,
    });
    return;
  }

  if (err.type === "notFound") {
    status = err.status || 500;
    message = err.message || "Internal Server Error";
    stack = err.stack || "No stack trace available";
    res.status(status).json({
      message,
      status,
      stack,
    });
    return;
  }

  if (err.type === "axios") {
    status = err.response.status || 500;
    message = err.response.statusText || "Internal Server Error";
    stack = err.stack || "No stack trace available";
    res.status(status).json({
      message,
      status,
      stack,
    });
    return;
  }

  logger.error(`Error fetching news: ${err.message}`, { err, status, stack }); // 记录错误信息以及任何有关的数据
};

module.exports = errorHandler;
