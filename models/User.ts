import mongoose, { Document, Schema, Model } from "mongoose";

const defaultBadges: Badge[] = [
  {
    badgeId: "voltage_crusader",
    name: "Voltage Crusader",
    description: "Generate 5000 volts to earn this badge.",
    imgUrl: "https://i.imgur.com/q2GQ6Uz.png",
    completed: false,
  },
  {
    badgeId: "energy_emission",
    name: "Energy Emission",
    description: "Generate 2500 volts to unlock this badge.",
    imgUrl: "https://i.imgur.com/soFLKRj.png",
    completed: false,
  },

  {
    badgeId: "kinetic_keeper",
    name: "Kinetic Keeper",
    description: "Take 10,000 steps to earn this badge.",
    imgUrl: "https://i.imgur.com/Vc3oPQ7.png",
    completed: false,
  },
  {
    badgeId: "power_pioneer",
    name: "Power Pioneer",
    description: "Accumulate 50,000 steps to unlock this badge.",
    imgUrl: "https://i.imgur.com/6o5XDRP.png",
    completed: false,
  },
  {
    badgeId: "step_master",
    name: "Step Master",
    description: "Achieve 25,000 steps to earn this badge.",
    imgUrl: "https://i.imgur.com/FwH2BVW.png",
    completed: false,
  },
  {
    badgeId: "step_shifter",
    name: "Step Shifter",
    description: "Reach 5,000 steps to unlock this badge.",
    imgUrl: "https://i.imgur.com/4r5jdlW.png",
    completed: false,
  },
  {
    badgeId: "trailblazer",
    name: "Trailblazer",
    description: "Welcome to SparkStep!",
    imgUrl: "https://i.imgur.com/Jota9bL.png",
    completed: false,
  },
  {
    badgeId: "voltage_voyager",
    name: "Voltage Voyager",
    description: "Generate 100 volts to unlock this badge.",
    imgUrl: "https://i.imgur.com/7UHExWX.png",
    completed: false,
  },
];

// Define the Badge interface
interface Badge {
  badgeId: string;
  name: string;
  description: string;
  imgUrl: string;
  completed: boolean;
}

interface Location {
  latitude: number;
  longitude: number;
}

// Define the badgeSchema
const badgeSchema = new Schema<Badge>({
  badgeId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

interface User extends Document {
  email: string;
  password: string;
  username: string;
  role: "user" | "admin";
  bio?: string;
  address?: string;
  phoneNumber?: string;
  profilePicture?: string;
  coverPhoto?: string;
  badges: Badge[];
  location?: Location[]; // Add location property
}

const locationSchema = new Schema<Location>({
  latitude: {
    type: Number,
    required: true,
    default: 15.6872, // Set the default latitude value
  },
  longitude: {
    type: Number,
    required: true,
    default: 120.4183, // Set the default longitude value
  },
});

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
  address: {
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
  badges: {
    type: [badgeSchema], // Add the badgeSchema to the badges field
    default: defaultBadges,
  },
  location: {
    type: [
      {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
    ],
    default: [
      { latitude: 15.6872, longitude: 120.4183 }, // Default coordinates
    ],
  },
});

// Export the UserModel
export const UserModel: Model<User> =
  mongoose.models.users || mongoose.model<User>("users", userSchema);
