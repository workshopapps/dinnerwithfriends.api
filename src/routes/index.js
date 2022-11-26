const express = require('express');
const {
  authRouter,
  participantRouter,
  eventRouter,
  invitationRouter,
  userRouter,
} = require('./v1');

const app = express();

app.use('/auth', authRouter);
app.use('/participant', participantRouter);
app.use('/event', eventRouter);
app.use('/invitation', invitationRouter);
app.use('/user', userRouter);

module.exports = app;
