const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Assuming two roles: user and admin
    default: "user", // Default role is user
  },
  bio: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  location: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  title: {
    type: String,
  },
});

export const UserModel =
  mongoose.models.users || mongoose.model("users", userSchema);
