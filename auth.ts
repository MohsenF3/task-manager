import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./lib/connect";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const { email } = credentials;

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email as string,
            },
          });

          console.log(user);

          return user;
        } catch (error) {
          console.error("Failed to fetch user ");
          return null;
        }
      },
    }),
  ],
});
