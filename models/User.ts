import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Voltage interface
interface Voltage {
  voltage: number;
  psi: number;
  timestamp: Date;
}

// Define the Day interface
interface Day {
  day: string;
  voltages: Voltage[];
}

// Define the User interface extending Document (for Mongoose)
interface User extends Document {
  email: string;
  password: string;
  username: string;
  role: "user" | "admin";
  bio?: string;
  phoneNumber?: string;
  profilePicture?: string;
  coverPhoto?: string;
  voltages: Day[];
}

// Define the voltageSchema
const voltageSchema = new Schema<Voltage>({
  voltage: {
    type: Number,
    required: true,
  },
  psi: {
    type: Number,
    required: true,
    default: 0, // Set a default value for psi
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Define the daySchema
const daySchema = new Schema<Day>({
  day: {
    type: String,
    required: true,
  },
  voltages: {
    type: [voltageSchema],
    default: [],
  },
});

// Function to generate the default voltages array for each day of the week
function getDefaultVoltages(): Day[] {
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

// Define the userSchema
const userSchema = new Schema<User>({
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
    default: getDefaultVoltages,
  },
});

// Middleware to set default voltages before saving a new user
userSchema.pre<User>("save", function (next: () => void) {
  if (this.isNew) {
    this.voltages = getDefaultVoltages();
  }
  next();
});

// Export the UserModel
export const UserModel: Model<User> =
  mongoose.models.users || mongoose.model<User>("users", userSchema);
