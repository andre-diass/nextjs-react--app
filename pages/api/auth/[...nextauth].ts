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
    async jwt({ account, token, user }) {
      console.log("JWT ACCOUNT =>>>>> ", account);
      console.log("JWT TOKEN =>>>>> ", token);
      console.log("JWT USER =>>>>> ", user);

      if (account && user) {
        const response = await api.post("/login", {
          userID: user.id,
          accountID: account.providerAccountId,
        });

        token.apiToken = response.data;
        console.log("CHANGED TOKEN:", token);

        return token;
      }
      return token;
    },
    async session({ session, token, token: { apiToken } }) {
      console.log("SESSION SESSION =>>>>> ", session);
      console.log("SESSION TOKEN =>>>>> ", token);

      return { ...session, apiToken };
    },
  },
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
