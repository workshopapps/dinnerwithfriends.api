const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const eventSchema = new mongoose.Schema({
    event_title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, `fullname can't be less than 3 characters`]
    },

    event_description: {
        type: String,
        trim: true,
        minlength: [3, `fullname can't be less than 3 characters`]
    },
    location: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, `fullname can't be less than 3 characters`]
    },

    event_type: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, `fullname can't be less than 3 characters`]
    },

    participant_number: {
        type: Number,
        required: true,
        trim: true
    },

    start_date: {
        type: String,
        required: true,
        trim: true
    },

    end_date: {
        type: String,
        required: true,
        trim: true
    },

    host_prefered_time: {
        type: String,
        required: true,
        trim: true
    },

    user_id: {
        type: Number,
        required: true
    }

}, 
{timestamps: true}
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;