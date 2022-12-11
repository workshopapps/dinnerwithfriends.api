const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
invitationSchema.virtual('host_info', {
  ref: 'User',
  foreignField: '_id',
  localField: 'user_id',
});

const Invitation = mongoose.model('Invitation', invitationSchema);
module.exports = Invitation;
