const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, `fullname can't be less than 3 characters`]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, `email field must be specified !!!`],
        lowercase: true,
      },

      prefered_date_time: {
        type: String,
        required: true,
        trim: true
      }

});

const Participant = mongoose.model("Participant", participantSchema);
module.exports = Participant;
