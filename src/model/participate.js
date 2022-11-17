
const mongoose = require("mongoose");

const ParticipateSchema = new mongoose.Schema(
    {

        event_id: {
            type: mongoose.Types,
            ref: 'Event',
            required: true
        },
        eventType: {
            type: String,
            trim: true,
        },
        proposedStartDate: {
            type: Date,
            required: true,
        },
        proposedEndDate: {
            type: Date,
            required: true
        },

    },
    {
        timestamps: true
    }
);


// Export the model
module.exports = mongoose.model("Participate", ParticipateSchema);