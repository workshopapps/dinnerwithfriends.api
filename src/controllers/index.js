const globalErrorHandler = require('./error');
const authControllers = require("./auth")
const participantControllers = require("./participant");
const eventControllers = require("./event")

module.exports = {
  globalErrorHandler,
  authControllers,
  participantControllers,
  eventControllers,
};
