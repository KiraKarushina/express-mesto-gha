const messages = require('../utils/messages');

class InternalServerError extends Error {
  constructor(message = messages.internal) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
