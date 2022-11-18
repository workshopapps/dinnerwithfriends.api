const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required:[true,"A user must have a name"]
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
        required: [true, 'Enter a user password'],
        minLength: 8,
        select: true,
    },
    refreshToken:{
        type:String,
        trim:true,
        default:null
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
);

userSchema.pre('save', async function (next) {
  if (!this.password) next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;