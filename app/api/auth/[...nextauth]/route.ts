import { connectToDb } from "@/lib/utils";
import { UserModel } from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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

          if (!user || user.password !== password) {
            return null;
          }

          console.log("Authorized user:", {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            bio: user.bio,
            phoneNumber: user.phoneNumber,
            profilePicture: user.profilePicture,
            location: user.location,
            birthday: user.birthday,
            title: user.title,
            level: user.level,
            coverPhoto: user.coverPhoto,
            voltages: user.voltages,
          });

          return {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            bio: user.bio,
            phoneNumber: user.phoneNumber,
            profilePicture: user.profilePicture,
            location: user.location,
            birthday: user.birthday,
            title: user.title,
            level: user.level,
            coverPhoto: user.coverPhoto,
            voltages: user.voltages,
          };
        } catch (error) {
          console.log(error);
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
        console.log("JWT callback user:", user);

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
        token.level = user.level;
        token.coverPhoto = user.coverPhoto;
        token.voltages = user.voltages;
      }

      console.log("JWT callback token:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback token:", token);

      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.role = token.role;
      session.user.bio = token.bio;
      session.user.phoneNumber = token.phoneNumber;
      session.user.profilePicture = token.profilePicture;
      session.user.location = token.location;
      session.user.birthday = token.birthday;
      session.user.title = token.title;
      session.user.level = token.level;
      session.user.coverPhoto = token.coverPhoto;
      session.user.voltages = token.voltages;

      console.log("Session callback session:", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
