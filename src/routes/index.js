const express = require('express');
const {
  authRouter,
  participantRouter,
  eventRouter,
  invitationRouter,
  userRouter,
  calendarRouter,
  contactRouter
} = require('./v1');

const app = express();

app.use('/auth', authRouter);
app.use('/participant', participantRouter);
app.use('/event', eventRouter);
app.use('/invitation', invitationRouter);
app.use('/user', userRouter);
app.use('/calendar', calendarRouter);
app.use('/contact', contactRouter);

module.exports = app;
