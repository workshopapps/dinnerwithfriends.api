const express = require('express');
const { baseRouter, authRouter, participantRouter } = require('./v1');

const app = express();

app.use("/auth",authRouter)
app.use("/participant", participantRouter)

module.exports = app;
