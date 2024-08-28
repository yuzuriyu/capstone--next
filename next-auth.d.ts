// next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
      bio?: string;
      phoneNumber?: string;
      profilePicture?: string;
      location?: string;
      birthday?: string;
      title?: string;
      level?: number;
      coverPhoto?: string;
      badges?: any[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    bio?: string;
    phoneNumber?: string;
    profilePicture?: string;
    location?: string;
    birthday?: string;
    title?: string;
    level?: number;
    coverPhoto?: string;
    badges?: any[];
  }
}
