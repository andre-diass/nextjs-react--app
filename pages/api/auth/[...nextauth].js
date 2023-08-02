import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: "c236d8c4ac7bee3d2786de1e0afd8b66",
});
