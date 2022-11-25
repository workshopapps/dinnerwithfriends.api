const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');
const app = require('./app');
const connect = require('./db');
const { Event, ParticipantCount } = require('./models');
const cron = require("node-cron")

// configure dotenv and port
dotenv.config();
const port = process.env.PORT || 8800;
const DB = process.env.MONGODB_URI;

const start = asyncHandler(async (_port, _url, _app) => {
  try {
    await connect(_url);
    _app.listen(_port, () => console.log(`Server is running on port: ${_port}`));
  } catch (error) {
    console.log(error);
  }
});

let  todayDate = new Date().toISOString().substring(0, 10);

cron.schedule('0 1 * * *', async () => {
  console.log('Running a task every midnight (1:00 am)');
  const event = Event.find()

  const participantCount = await ParticipantCount.find()
  Event.findOneAndUpdate({ campaignStatus: 'active', end_date: { 

    $lt: todayDate, 

 }}, { $set:  {campaignStatus: 'inactive' }},

 {returnNewDocument: true}, (err, data) => {
  if (err) {
    return errorHandler(dbError, res);
  }
})
});

// unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 🎇 Shutting down');
  app.close(() => {
    process.exit(1);
  });
});

start(port, DB, app);
