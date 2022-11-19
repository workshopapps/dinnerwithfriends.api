const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Participant', participantSchema);