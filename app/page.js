import React from "react";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import Container from "@/components/Container";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div>
      {session ? (
        <>
          <Container session={session} />
        </>
      ) : (
        <>
          <p>Not logged in</p>

          <a href="/api/auth/signin">Sign in</a>
        </>
      )}
    </div>
  );
}
