const baseRouter = require('./base');
const authRouter = require("./auth");
const participantRouter = require("./participant");
const eventRouter = require("./event");

module.exports = {
  baseRouter,
  authRouter,
  participantRouter,
  eventRouter,
};
