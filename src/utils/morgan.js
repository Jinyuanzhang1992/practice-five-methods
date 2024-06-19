const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const createLogger = require("./logger");
const logger = createLogger();
const moment = require("moment");

morgan.format("custom", (tokens, req, res) => {
  // const isoDate = tokens.date(req, res, "iso");
  // const formattedDate = moment(isoDate).format("YYYY-MM-DD HH:mm:ss");
  return JSON.stringify({
    timestamp: moment(tokens.date(req, res, "iso")).format(
      "YYYY-MM-DD HH:mm:ss"
    ),
    clientIP: tokens["remote-addr"](req, res),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    responseTime: `${tokens["response-time"](req, res)} ms`,
    userAgent: tokens["user-agent"](req, res),
  });
});

// module.exports = morgan(process.env.NODE_ENV === "dev" ? "tiny" : "combined", {
//   stream: logger.stream,
// });

module.exports = morgan("custom", {
  stream: logger.stream,
});
