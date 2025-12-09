"use client";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import heroImage from "@/assets/hero-meeting.jpg";
import { Calendar, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./";

const Hero = () => {
  const { user } = useUser();

  console.log(user);
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="h-[300px] space-y-6">
          {user ? (
            <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
              Welcome{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {user.firstName}
              </span>
            </h1>
          ) : (
            <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Connect Teams
              </span>
              <br />
              Anywhere, Anytime
            </h1>
          )}
          <p className="text-xl text-muted-foreground">
            Professional video meetings made simple. Host secure video calls,
            collaborate in real-time, and stay connected with your team.
          </p>

          <SignedIn>
            <div className="flex gap-4">
              <Button asChild variant="hero" size="lg">
                <Link href="/create">
                  <Play className="h-5 w-5" />
                  Start Meeting
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/meetings">
                  <Calendar className="h-5 w-5" />
                  View Meetings
                </Link>
              </Button>
            </div>
          </SignedIn>
          <SignedOut>
            <Button asChild variant="hero" size="lg">
              <SignInButton />
            </Button>
          </SignedOut>
        </div>

        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/30 to-accent/30 blur-3xl"></div>
          <div className="relative rounded-2xl bg-card/50 p-2 shadow-[var(--shadow-elegant)] backdrop-blur-sm"></div>
          <Image
            src={heroImage}
            alt="Professional video meeting with diverse team members"
            className="rounded-xl"
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
