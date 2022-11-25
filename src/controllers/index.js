const globalErrorHandler = require('./error');
const authControllers = require("./auth")
const participantControllers = require("./participant");
const eventControllers = require("./event")
const userControllers = require("./user")

module.exports = {
  globalErrorHandler,
  authControllers,
  participantControllers,
  eventControllers,
  userControllers
};
