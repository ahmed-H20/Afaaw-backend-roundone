const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      // select: false,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },

    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Please provide your address"],
      trim: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Hash Password by mongoose middleware
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
