const winston = require('winston');

const expexpressWinston = require('express-winston');

const dirname = 'logs';

const requestLogger = expexpressWinston.logger({
  transports: [
    new winston.transport.File({ dirname, filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expexpressWinston.errorLogger({
  transport: [
    new winston.transport.File({ dirname, filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
