import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const ADMIN_ROUTE = process.env.NEXT_PUBLIC_ADMIN_ROUTE || "admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "1",
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: `/${ADMIN_ROUTE}/login`,
  },
});
