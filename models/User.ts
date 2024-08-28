import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Badge interface
interface Badge {
  badgeId: string;
  name: string;
  description: string;
  imgUrl: string;
  completed: boolean;
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
  phoneNumber?: string;
  profilePicture?: string;
  coverPhoto?: string;
  badges: Badge[];
}

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
  badges: {
    type: [badgeSchema], // Add the badgeSchema to the badges field
    default: [],
  },
});

// Export the UserModel
export const UserModel: Model<User> =
  mongoose.models.users || mongoose.model<User>("users", userSchema);
