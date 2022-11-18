const globalErrorHandler = require('./error');
const { createEvent, updateEvent } = require('./event');
const participantControllers = require("./participant");
const authControllers = require("./auth");

module.exports = {
  globalErrorHandler,
  updateEvent,
  createEvent,
  authControllers,
  participantControllers

};
