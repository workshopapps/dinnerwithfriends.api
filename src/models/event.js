const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event_title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, `event title can't be less than 3 characters`],
    },

    event_description: {
      type: String,
      trim: true,
      minlength: [3, `event description can't be less than 3 characters`],
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, `location can't be less than 3 characters`],
    },

    event_type: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, `event type can't be less than 3 characters`],
    },

    participant_number: {
      type: Number,
      required: true,
    },

    start_date: {
      type: String,
      required: true,
      trim: true,
    },

    end_date: {
      type: String,
      required: true,
      trim: true,
    },
    published: {
      type: String,
      trim: true,
      enum: ['decided', 'not-decided', 'ended', 'cancelled'],
      default: 'not-decided',
    },
    final_event_date: {
      type: String,
      trim: true,
      default: null,
    },
    host_prefered_time: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey:false,timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual populate
eventSchema.virtual('host_info', {
  ref: 'User',
  foreignField: '_id',
  localField: 'user_id',
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
