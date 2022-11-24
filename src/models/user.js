const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default:null,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'A user must have an email'],
      lowercase: true,
    },
    password: {
      type: String,
      minLength: 8,
      default: null,
      select: true,
    },
    refreshToken: {
      type: String,
      trim: true,
      default: null,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey:false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.password) next();
  if (this.refreshToken) next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method. method available in the whole model
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  const passwordStatus = await bcrypt.compare(candidatePassword, userPassword);
  return passwordStatus;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
