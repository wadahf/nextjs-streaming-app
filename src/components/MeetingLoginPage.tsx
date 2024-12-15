import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";
import React from "react";
import Button, { buttonClassName } from "./Button";
import Link from "next/link";
import { cn } from "@/utils/helpers";
import { Loader2 } from "lucide-react";

const MeetingLoginPage = () => {
  return (
    <div className="mx-auto w-fit space-y-3">
      <h1 className="text-center text-2xl font-bold">Join Meeting</h1>
      <ClerkLoaded>
        <SignInButton>
          <Button className="w-44">Sign in</Button>
        </SignInButton>
        <Link
          href="?guest=true"
          className={cn(buttonClassName, "w-44 bg-gray-400 hover:bg-gray-500")}
        >
          Continue as a Guest
        </Link>
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="mx-auto animate-spin" />
      </ClerkLoading>
    </div>
  );
};

export default MeetingLoginPage;
