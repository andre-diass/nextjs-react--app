import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { Adapter } from "next-auth/adapters";
import type { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: "c236d8c4ac7bee3d2786de1e0afd8b66",
  adapter: MongoDBAdapter(clientPromise) as Adapter | undefined,
};

export default NextAuth(authOptions);
