const logger = require("../../config/logger");

const logApiCalls = (req, res, next) => {
  if (req.originalUrl.startsWith("/uploads")) {
    return next();
  }
  logger.info(`API Called: ${req?.method} ${req?.originalUrl}`);
  next();
};

module.exports = logApiCalls;
