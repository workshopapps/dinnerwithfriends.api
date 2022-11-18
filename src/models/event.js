const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const eventSchema = new mongoose.Schema(
  {
    user_id: {
        type: Number,
        ref: 'Event'
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    }, 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    time_slots: {
        type: Object
    },
    participant_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Participants'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;