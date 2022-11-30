const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const v1 = require('./routes');
const { baseRouter } = require('./routes/v1/index');
const { globalErrorHandler } = require('./controllers');
const swaggerUi = require('swagger-ui-express');
const swaggerDocumentation = require('./utilities/documentation');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const {
  generateFinalEventsDates,
} = require('./services/generateFinalEventDate');
const corsOptions = require('./config/corsOptions');

// create an express app
const app = express();

// var corsOptions = {
//   origin: 'https://catchup.hng.tech',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

cron.schedule('0 1 * * *', async () => {
  console.log('Running a task every midnight (1:00 am)');
  await generateFinalEventsDates();
});

// middlewares
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://catchup.hng.tech'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.setup(swaggerDocumentation));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
app.use(xss());
app.use(morgan('dev'));

// app.use(passport.initialize());
// require('./middlewares/passport');
// routes
app.use('/api/v1', v1);
app.use('/', baseRouter);

app.use(globalErrorHandler);
module.exports = app;
