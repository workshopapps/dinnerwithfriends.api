const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A user must have a name'],
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
    gender: {
      type: String,
      required: false,
      enum:["male","female","non-binary","none"],
      default:"none"
    },
    mobile: {
      type: String,
      required: false,
      default:"+234"
    },
    birthday: {
      type: String,
      required: false,
      default:"12/09/1990"
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
