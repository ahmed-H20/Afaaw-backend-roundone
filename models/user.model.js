import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, required: true, trim: true,
      minlength: [3, "Name must be at least 3 characters long."],
      maxlength: [50, "Name cannot exceed 50 characters."]
     },
    email: { 
      type: String, required: true, unique: true, trim: true, lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address."],
      maxlength: [100, "Email cannot exceed 100 characters."]
     },
    password: { 
      type: String, required: true, select: false,
      minlength: [8, "Password must be at least 8 characters long."],
      maxlength: [100, "Password cannot exceed 100 characters."]
    },
    // Validet phone egyptian number
    phone: {
      type: String, trim: true,
      match: [/^01[0125][0-9]{8}$/, "Please use a valid Egyptian phone number."],
      maxlength: [11, "Phone number cannot exceed 11 characters."]
    },
    address: { type: String, trim: true, maxlength: [200, "Address cannot exceed 200 characters."] },
    active: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    tokenVersion: { type: Number, default: 0, select: false },
    resetPasswordCode: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
    resetPasswordAttempts: { type: Number, default: 0, select: false },
    resetPasswordRequestedAt: { type: Date },
    verificationToken: { type: String, select: false },
    verificationExpires: { type: Date, select: false },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// encryption password before saving to database
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  this.resetPasswordRequestedAt = Date.now() - 1000; // Set to 1 second in the past to avoid immediate expiration
});

// compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// // full name virtual property
// userSchema.virtual("fullName").get(function () {
//   return `${this.name}`;
// });

const User = mongoose.model("User", userSchema);
export default User;
