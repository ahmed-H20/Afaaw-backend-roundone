import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

// encryption password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
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
