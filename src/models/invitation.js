const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email_list: {
      type: Array,
      required: true,
      lowercase: true,
    },
    event_id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
