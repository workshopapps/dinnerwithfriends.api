const globalErrorHandler = require('./error');
const authControllers = require("./auth")
const eventControllers = require("./event")


module.exports = {
  globalErrorHandler,
  authControllers,
  eventControllers
};
