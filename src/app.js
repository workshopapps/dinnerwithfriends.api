const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const v1 = require('./routes');
const { baseRouter, authRouter } = require('./routes/v1/index');
const { globalErrorHandler } = require('./controllers');
const swaggerUi = require('swagger-ui-express');
const swaggerDocumentation = require('./utilities/documentation');

// create an express app
const app = express();

// middlewares
app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.setup(swaggerDocumentation));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(morgan('dev'));

// routes
app.use('/api/v1', v1);
app.use('/users/', authRouter);
app.use('/', baseRouter);

app.use(globalErrorHandler);
module.exports = app;
