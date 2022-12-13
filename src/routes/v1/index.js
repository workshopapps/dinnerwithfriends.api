const baseRouter = require('./base');
const authRouter = require('./auth');
const participantRouter = require('./participant');
const eventRouter = require('./event');
const invitationRouter = require('./invitation');
const userRouter = require('./user')
const calendarRouter = require('./calendar')
const contactRouter = require('./contact')

module.exports = {
  baseRouter,
  authRouter,
  participantRouter,
  eventRouter,
  invitationRouter,
  userRouter,
  calendarRouter,
  contactRouter
};
