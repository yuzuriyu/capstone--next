const mongoose = require("mongoose");

const voltageSchema = new mongoose.Schema({
  voltage: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now, // Automatically set the timestamp to the current date and time
  },
});

const daySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  voltages: {
    type: [voltageSchema],
    default: [], // Default empty array for voltages
  },
});

// Function to generate the default voltages array for each day of the week
function getDefaultVoltages() {
  return [
    { day: "Mon", voltages: [] },
    { day: "Tue", voltages: [] },
    { day: "Wed", voltages: [] },
    { day: "Thu", voltages: [] },
    { day: "Fri", voltages: [] },
    { day: "Sat", voltages: [] },
    { day: "Sun", voltages: [] },
  ];
}

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
  coverPhoto: {
    type: String,
  },
  voltages: {
    type: [daySchema],
    default: getDefaultVoltages, // Set the default value using the function
  },
});

// Middleware to set default voltages before saving a new user
userSchema.pre("save", function (next) {
  if (this.isNew) {
    this.voltages = getDefaultVoltages();
  }
  next();
});

export const UserModel =
  mongoose.models.users || mongoose.model("users", userSchema);
