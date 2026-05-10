const mongoose = require('mongoose');

const connect = async (url) => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Database connection is successful');
  return;
};

module.exports = connect;
