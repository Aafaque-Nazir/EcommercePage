"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) return <p className="text-center mt-10">Not logged in</p>;

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">Welcome {session.user.name}</h1>
      <p>{session.user.email}</p>
      <img
        src={session.user.image}
        alt="profile"
        className="w-20 h-20 rounded-full mt-4"
      />
      <Button className="mt-6" onClick={() => signOut({ callbackUrl: "/" })}>
        Logout
      </Button>
    </div>
  );
}
