const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, trim: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    passwordResetOtp: { type: String, default: null, select: false },
    passwordResetExpires: { type: Date, default: null, select: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.setPasswordResetOtp = async function (otp) {
  this.passwordResetOtp = await bcrypt.hash(otp, 12);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
};

userSchema.methods.comparePasswordResetOtp = async function (otp) {
  if (!this.passwordResetOtp || !this.passwordResetExpires) {
    return false;
  }

  const isValid = await bcrypt.compare(String(otp), this.passwordResetOtp);
  return isValid && Date.now() <= this.passwordResetExpires;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.passwordResetOtp;
  delete user.passwordResetExpires;
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
