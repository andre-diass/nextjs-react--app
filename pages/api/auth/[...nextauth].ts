import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { Adapter } from "next-auth/adapters";
import type { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import api from "@/services";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise) as Adapter | undefined,
  callbacks: {
    async jwt({ session, account, token, user, profile }) {
      if (account && user) {
        const response = await api.post("/login", {
          userID: user.id,
          accountID: account.providerAccountId,
        });

        token = response.data;

        return token;
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        token,
      };
    },
  },
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
