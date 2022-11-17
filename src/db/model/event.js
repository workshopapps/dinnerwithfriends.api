/* eslint-disable indent */
/* eslint-disable linebreak-style */

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
  title: {
    type: String,
    trim: true,
    required: true,
  },
  proposed_start_date: {
    type: Date,
    trim: true,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  final_event_date: {
    type: Date,
    trim: true,
  },
  final_event_time: {
    type: Date,
    trim: true,
  },
  participant_count: {
    type: Object,
  },
  proposed_start_time: {
    type: Date,
    trim: true,
  },
  proposed_end_time: {
    type: Date,
    trim: true,
  },
  event_duration: {
    type: Number,
    trim: true,
  },
  host_preferred_date: {
    type: Date,
    trim: true,
    required: true,
  },
  host_preferred_time: {
    type: Date,
    trim: true,
    required: true,
  },
  event_location: {
    type: String,
    trim: true,
  },
  registration_end_date: {
    type: Date,
    trim: true,
    required: true,
  },
  max_participant: {
    type: Number,
    required: true,
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('Event', eventSchema);
