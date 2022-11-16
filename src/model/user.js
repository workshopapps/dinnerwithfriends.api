const bcrypt = require("bcrypt");
const { BCRYPT_SALT } = process.env;
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: [true, "Username is required"],
        },
        // signup_type : {
        //     type :  String,
        //     trim : true,
        //     enum : ["email", "third-party"],
        //     default : "email",
        //     required : true
        // },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next()

    const hash = await bcrypt.hash(this.password, parseInt(BCRYPT_SALT));
    this.password = hash;

    next();
});

// Export the model
module.exports = mongoose.model("User", UserSchema);
