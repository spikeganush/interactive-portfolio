import User from '@/models/user';
import { connectToDatabase } from '@/utils/database';
import { formatUsername } from '@/lib/utils';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { withDatabaseConnection } from '@/lib/server-utils';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_SECRET;
if (!clientId || !clientSecret) {
  throw new Error('Missing Google Client ID or Secret');
}

const handler = withDatabaseConnection(
  NextAuth({
    providers: [
      GoogleProvider({
        clientId,
        clientSecret,
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
          if (!profile || !profile.email || !profile.name) {
            return false;
          }
          // check if user exists in database
          const userExists = await User.findOne({ email: profile.email });

          // if not, create user in database
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: formatUsername(profile.name),
              image: profile.image,
            });
          }
          return true;
        } catch (error) {
          console.log('An error occured during sign-in: ', error);
          return false;
        }
      },
    },
  })
);

export { handler as GET, handler as POST };
