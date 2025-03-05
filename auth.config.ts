// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { loginSchema } from "./lib/loginSchema";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
          email: { label: "Email", type: "email", placeholder: "Email" },
          password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
          let user = null;

          // validate credentials
          const parsedCredentials = loginSchema.safeParse(credentials);
          if (!parsedCredentials.success) {
              console.error("Invalid credentials:", parsedCredentials.error.errors);
              return null;
          }
          // get user
          const { email, password } = parsedCredentials.data;

        // Fetch user from the database
         user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.error("User not found");
          return null;
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          console.error("Invalid password");
          return null;
        }

        return user;
      }
  })
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
        // console.log(auth)
        const isLoggedIn = !!auth?.user;
        const { pathname } = nextUrl;
        // const role = auth?.user.role || 'user';
        if (pathname.startsWith('/login') && isLoggedIn) {
            return Response.redirect(new URL('/', nextUrl));
        }
        return !!auth;
    },
    jwt({ token, user, trigger, session }) {
      // console.log("token",token)
        if (user) {
            token.id = user.id as string;
            // token.role = user.role as string;
        }
        if (trigger === "update" && session) {
            token = { ...token, ...session };
        }
        return token;
    },
    session({ session, token }) {
      // console.log("session",token)
        session.user.id = token.id;
        // session.user.role = token.role;
        return session;
    }
},
pages: {
    signIn: "/login"
},
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;