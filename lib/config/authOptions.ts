// lib/configs/authOptions.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "@/lib/utils";
import { UserModel } from "@/models/User";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials;

        try {
          await connectToDb();
          const user = await UserModel.findOne({ email });

          if (!user) {
            console.error("User not found:", email);
            return null;
          }

          if (user.password !== password) {
            console.error("Invalid password for user:", email);
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username || "",
            role: user.role || "",
            bio: user.bio || "",
            phoneNumber: user.phoneNumber || "",
            profilePicture: user.profilePicture || "",
            location: user.location || "",
            birthday: user.birthday || "",
            title: user.title || "",
            coverPhoto: user.coverPhoto || "",
            voltages: user.voltages || [],
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
        token.bio = user.bio;
        token.phoneNumber = user.phoneNumber;
        token.profilePicture = user.profilePicture;
        token.location = user.location;
        token.birthday = user.birthday;
        token.title = user.title;
        token.coverPhoto = user.coverPhoto;
        token.voltages = user.voltages;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.role = token.role as string;
        session.user.bio = token.bio as string;
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.profilePicture = token.profilePicture as string;
        session.user.location = token.location as string;
        session.user.birthday = token.birthday as string;
        session.user.title = token.title as string;
        session.user.coverPhoto = token.coverPhoto as string;
        session.user.voltages = token.voltages as any[];
      }
      return session;
    },
  },
};

export default authOptions;
