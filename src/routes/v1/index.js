const baseRouter = require('./base');
const authRouter = require("./auth")
const participantRouter = require("./participant")

module.exports = {
  baseRouter,
  authRouter,
  participantRouter
};
