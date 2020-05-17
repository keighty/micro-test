const { createLogger, transports, format } = require('winston');

const LOG_DIR = `${process.cwd()}/logs`

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.json(),
    format.timestamp()
  ),
  defaultMeta: { service: 'user_service' },
  transports: [
    new transports.File({ filename: `${LOG_DIR}/error-log.log`, level: 'error' }),
    new transports.File({ filename: `${LOG_DIR}/combined.log` }),
  ]
});

//
// From the winston docs: 
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

module.exports = logger
