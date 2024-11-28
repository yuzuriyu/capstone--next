import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "@/lib/utils";
import { UserModel } from "@/models/User";
import { VoltageModel } from "@/models/Voltage"; // Import the VoltageModel
import { ObjectId } from "mongoose";

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

          // Check if voltage data exists for this user
          let userVoltageData = await VoltageModel.findOne({ email });
          if (!userVoltageData) {
            // Create voltage data if it doesn't exist
            await VoltageModel.create({ email, voltages: [] });
          }

          return {
            id: (user._id as ObjectId).toString(), // Cast to ObjectId and then to string
            email: user.email,
            username: user.username || "",
            role: user.role || "",
            bio: user.bio || "",
            address: user.address || "",
            phoneNumber: user.phoneNumber || "",
            profilePicture: user.profilePicture || "",
            coverPhoto: user.coverPhoto || "",
            badges: user.badges || [],
            location: user.location || [], // Add location field
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
        token.address = user.address;
        token.phoneNumber = user.phoneNumber;
        token.profilePicture = user.profilePicture;
        token.coverPhoto = user.coverPhoto;
        token.badges = user.badges;
        token.location = user.location;
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
        session.user.address = token.address as string;
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.profilePicture = token.profilePicture as string;
        session.user.coverPhoto = token.coverPhoto as string;
        session.user.badges = token.badges as any[];
        session.user.location = token.location as any[];
      }
      return session;
    },
  },
};

export default authOptions;
