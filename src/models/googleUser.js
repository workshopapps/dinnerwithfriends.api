const mongoose = require('mongoose');

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

const GoogleUser = mongoose.model("GoogleUser", userSchema);

module.exports = GoogleUser;