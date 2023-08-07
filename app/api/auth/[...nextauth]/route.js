import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // When user logged in, log the user in the console
  callbacks: {
    async signIn(user, account) {
      console.log(user.profile.email ?? "no email");

      const findUser = await prisma.user.findUnique({
        where: {
          email: user.profile.email,
        },
      });

      if (findUser) {
        console.log("user already exists");

        const updatedUser = await prisma.user.update({
          where: {
            email: user.profile.email,
          },
          data: {
            avatar: user.profile.picture ?? "null",
          },
        });

        console.log("updated user", updatedUser);
      } else {
        console.log("user does not exist");

        const newUser = await prisma.user.create({
          data: {
            email: user.profile.email,
            name:
              user.profile.name ??
              `user-${Math.floor(Math.random() * 1000000)}`,
            avatar: user.profile.picture ?? "null",
          },
        });

        console.log("created new user", newUser);
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
