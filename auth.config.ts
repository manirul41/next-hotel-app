import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { loginSchema } from "./lib/loginSchema";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      // @ts-ignore
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }

        const { email, password } = parsedCredentials.data;

        // Fetch user from the database
        const user = await prisma.user.findUnique({
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

        // Create tokens
        const accessToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
          { id: user.id },
          process.env.REFRESH_SECRET!,
          { expiresIn: "7d" }
        );

        // Update refresh token in the database
        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken },
        });

        return {
          id: user.id,
          email: user.email,
          accessToken,
          refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google OAuth sign-in
      if (account?.provider === "google") {
        const { email, name, image } = profile as any;

        // Check if the user already exists in the database
        let dbUser = await prisma.user.findUnique({
          where: { email },
        });

        // If the user doesn't exist, create a new user
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email,
              name,
              password: "", // Google users don't need a password
              refreshToken: "", // Initialize with an empty refresh token
            },
          });
        }

        // Generate a refresh token for the user
        const refreshToken = jwt.sign(
          { id: dbUser.id },
          process.env.REFRESH_SECRET!,
          { expiresIn: "7d" }
        );

        // Update the user's refresh token in the database
        await prisma.user.update({
          where: { id: dbUser.id },
          data: { refreshToken },
        });

        // Attach the tokens to the user object
        // @ts-ignore
        user.id = dbUser.id;
        // @ts-ignore
        user.accessToken = jwt.sign(
          { id: dbUser.id, email: dbUser.email },
          process.env.JWT_SECRET!,
          { expiresIn: "15m" }
        );
        // @ts-ignore
        user.refreshToken = refreshToken;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.accessToken = user.accessToken;
        // @ts-ignore
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.id;
      // @ts-ignore
      session.user.accessToken = token.accessToken;
      // @ts-ignore
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;