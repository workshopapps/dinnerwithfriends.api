const mongoose = require('mongoose');

const accountRecoverySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model('AccountRecovery', accountRecoverySchema);

module.exports = User;
