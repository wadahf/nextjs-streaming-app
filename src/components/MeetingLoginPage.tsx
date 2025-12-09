import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components";
import Link from "next/link";
import React from "react";

const MeetingLoginPage = () => {
  return (
    <div className="mx-auto w-fit space-y-3 pt-24">
      <h1 className="text-center text-2xl font-bold">Join Meeting</h1>
      <ClerkLoaded>
        <div className="flex flex-col gap-4">
          <SignInButton>
            <Button className="w-44">Sign in</Button>
          </SignInButton>

          <Button className="w-44 bg-gray-400 hover:bg-gray-500">
            <Link href="?guest=true">Continue as a Guest</Link>
          </Button>
        </div>
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="mx-auto animate-spin" />
      </ClerkLoading>
    </div>
  );
};

export default MeetingLoginPage;
