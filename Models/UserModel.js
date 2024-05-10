const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  phoneNumber: {
    required: [true, "Phone Number is required"],
    type: Number,
    unique: [true, "User already exists, try logining in"],
    validate: {
      validator: function (value) {
        // Check if the phone number has exactly 10 digits
        return (
          validator.isMobilePhone(String(value), "any", { exact: true }) &&
          String(value).length === 10
        );
      },
      message: "Please enter a valid 10-digit phone number",
    },
  },
  emailAddress: {
    type: String,
    required: true,
  },
  password: {
    required: [true, "Please provide a password"],
    type: String,
    minlength: [8, "Password should contain atleast 8 characters"],
    trim: true,
    select: false,
  },
  confirmPassword: {
    required: [true, "Please confirm the password"],
    type: String,
    minlength: [8, "Password should contain atleast 8 characters"],
    trim: true,
    validate: {
      validator: function (ele) {
        return ele === this.password;
      },
      message: "Passwords do not match",
    },
  },
  role: {
    type: String,
    enum: ["Guest", "Premium", "Admin", "Analyser"],
    default: "Guest",
  },
  dateOfRegister: {
    type: Date,
    default: Date.now(),
  },
  dateOfSubscription:{
    type:Date,
    default:null,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  movieWatched: [
    {
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
      complete: {
        type: Boolean,
        default: false,
      },
      durationWatched: {
        type: Number,
        default: 0,
      },
    },
  ],
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 12);
    update.passwordChangedAt = Date.now();
  }
  next();
});
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 1000 * 60 * 5;
  return resetToken;
};
userSchema.methods.changesPasswordAfter = async function (JWTTimestamp) {
  console.log(JWTTimestamp, this.passwordChangedAt.getTime() / 1000);
  if (JWTTimestamp > this.passwordChangedAt.getTime() / 1000) return true;
  return false;
};
userSchema.methods.comparePasswords = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
