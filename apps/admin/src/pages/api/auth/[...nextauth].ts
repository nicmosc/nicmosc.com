import { prisma } from '@nicmosc/database';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_SECRET : undefined,
  callbacks: {
    async signIn({ user }: { user: { email: string } }) {
      const isAllowedToSignIn = await prisma.user.findUnique({ where: { email: user.email } });
      if (isAllowedToSignIn != null) {
        return true;
      } else {
        return false;
      }
    },
  },
};

// @ts-ignore
export default NextAuth(authOptions);
