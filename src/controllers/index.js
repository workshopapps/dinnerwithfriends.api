const globalErrorHandler = require('./error');
const authControllers = require("./auth")
const participantControllers = require("./participant");

module.exports = {
  globalErrorHandler,
  authControllers,
  participantControllers
};
