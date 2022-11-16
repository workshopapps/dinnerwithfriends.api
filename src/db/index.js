const mongoose = require('mongoose');

const connect = async (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Database connection is successful');
  return;
};

module.exports = connect;
