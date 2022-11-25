const express = require('express');
const { baseRouter, authRouter, participantRouter, eventRouter, invitationRouter } = require('./v1');

const app = express();

app.use("/auth",authRouter)
app.use("/participant", participantRouter)
app.use("/event",eventRouter)
app.use("/invitation",invitationRouter)

module.exports = app;