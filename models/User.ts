const mongoose = require("mongoose");

const voltageSchema = new mongoose.Schema({
  voltage: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const daySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  voltages: [voltageSchema],
});

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
    enum: ["user", "admin"],
    default: "user",
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
  coverPhoto: {
    type: String,
  },
  voltages: [daySchema],
});

export const UserModel =
  mongoose.models.users || mongoose.model("users", userSchema);
