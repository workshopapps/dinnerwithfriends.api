const express = require('express');
const { baseRouter, authRouter, eventRouter } = require('./v1');

const app = express();

app.use("/auth",authRouter)
app.use("/event",eventRouter)

module.exports = app;
