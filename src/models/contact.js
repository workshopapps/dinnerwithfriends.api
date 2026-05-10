/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, 'email field must be specified !!!'],
    lowercase: true,
    unique: true,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
