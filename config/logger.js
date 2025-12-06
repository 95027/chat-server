const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () =>
        new Date().toLocaleDateString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: true,
        }),
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
