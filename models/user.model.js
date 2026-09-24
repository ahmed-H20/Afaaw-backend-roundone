const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const roles = require("../constants/roles");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      minlength: [5, "Address must be at least 5 characters"],
      maxlength: [100, "Address cannot exceed 100 characters"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();

  if (!update) return;

  const password = update.password ?? update.$set?.password;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (update.$set?.password !== undefined) {
      update.$set.password = hashedPassword;
    } else {
      update.password = hashedPassword;
    }

    this.setUpdate(update);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
