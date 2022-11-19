const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
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
    }

}, 
{timestamps: true}
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
