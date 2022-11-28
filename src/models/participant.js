/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'fullname can\'t be less than 3 characters'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'email field must be specified !!!'],
    lowercase: true,
  },
  event_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  preferred_date_time: {
    type: String,
    required: true,
    trim: true,
  },

},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant
