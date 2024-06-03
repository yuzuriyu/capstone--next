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
            // Return null if user not found or password does not match
            return null;
          }

          // Return the user object
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
      }
      return token;
    },
    async session({ session, token }) {
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
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
