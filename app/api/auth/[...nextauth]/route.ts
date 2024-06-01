import { connectToDb } from "@/lib/utils";
import { UserModel } from "@/models/User";
import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectToDb();
          const user = await UserModel.findOne({ email });

          if (!user) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
