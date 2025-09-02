"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

          <Button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
