// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

// Define the Location type for better clarity
type Location = {
  latitude: number;
  longitude: number;
};

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
      bio?: string;
      address?: string;
      phoneNumber?: string;
      profilePicture?: string;
      birthday?: string;
      title?: string;
      level?: number;
      coverPhoto?: string;
      badges?: any[]; // Consider defining a Badge type if possible
      location?: { latitude: number; longitude: number }[]; // Add location type here
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    bio?: string;
    address?: string;
    phoneNumber?: string;
    profilePicture?: string;
    birthday?: string;
    title?: string;
    level?: number;
    coverPhoto?: string;
    badges?: any[];
    location?: { latitude: number; longitude: number }[]; // Add location type here
  }
}
