const express = require('express');
const { baseRouter, authRouter } = require('./v1');

const app = express();

app.use("/auth",authRouter)

module.exports = app;
