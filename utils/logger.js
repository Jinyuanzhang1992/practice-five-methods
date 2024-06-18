const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // 最低日志级别，将记录此级别及以上的日志
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json()
  ),
  transports: [
    // 输出到控制台，使用 JSON 格式
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.json()
      ),
    }),
    // 输出到文件，同样使用 JSON 格式
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.File({ filename: "errors.log", level: "error" }),
  ],
});

module.exports = logger;
