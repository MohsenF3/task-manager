import type { NextAuthConfig } from "next-auth";
import prisma from "./lib/connect";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        try {
          const user = await prisma.user.findUnique({
            where: { email: profile?.email as string },
          });

          if (!user) {
            await prisma.user.create({
              data: {
                name: profile?.login as string,
                email: profile?.email as string,
                image: profile?.avatar_url as string,
              },
            });
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      if (account?.provider === "google") {
        try {
          const user = await prisma.user.findUnique({
            where: { email: profile?.email as string },
          });

          if (!user) {
            await prisma.user.create({
              data: {
                name: profile?.name as string,
                email: profile?.email as string,
                image: profile?.picture as string,
              },
            });
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const userInfo = await prisma.user.findUnique({
          where: {
            email: user.email as string,
          },
        });
        token.id = userInfo?.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnTasks = nextUrl.pathname.startsWith("/tasks");
      if (isOnTasks) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/", nextUrl));
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/tasks", nextUrl));
      }
      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
