import NextAuth from "next-auth/next";
import authOptions from "@/api/config/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };