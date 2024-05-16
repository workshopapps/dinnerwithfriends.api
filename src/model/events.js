
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        eventDate : {
            type :  Date,
            required : false
        },
        proposedStartDate: {
            type: Date,
            required: true,
        },
        proposedEndDate: {
            type: Date,
            required:true
        },
        hostProposedEndDate: {
            type: Date,
            required:true
        },
        hostProposedEndDate: {
            type: Date,
            required:true
        },
    },
    {
        timestamps: true
    }
);


// Export the model
module.exports = mongoose.model("Event", EventSchema);