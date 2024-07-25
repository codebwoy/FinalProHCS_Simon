// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Use ES module syntax for imports

// Define the UserSchema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Additional fields as necessary
});

// Example of a pre-save hook to hash passwords
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// Create the User model using UserSchema
const User = mongoose.model("User", UserSchema);

export default User; // Export User as default
