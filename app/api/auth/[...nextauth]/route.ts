import User from '@/models/user';
import { connectToDatabase } from '@/utils/database';
import { formatUsername } from '@/utils/generalUtilities';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session.user || !session.user.email || !session.user.image) {
        return session;
      }
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        if (!profile) {
          return false;
        }
        connectToDatabase();
        // check if user exists in database
        const userExists = await User.findOne({ email: profile.email });

        // if not, create user in database
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: formatUsername(profile.name!),
            image: profile.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
