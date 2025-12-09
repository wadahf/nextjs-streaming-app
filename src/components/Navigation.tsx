"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Video, Calendar, Plus } from "lucide-react";
import { Button } from "@/components";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    // <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-r from-primary to-accent p-2 transition-opacity group-hover:opacity-90">
              <Video className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent">
              MeetHub
            </span>
          </Link>

          <SignedIn>
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
              >
                <Link href="/">Home</Link>
              </Button>
              <Button
                asChild
                variant={isActive("/meetings") ? "default" : "ghost"}
                size="sm"
              >
                <Link href="/meetings">
                  <Calendar className="h-4 w-4" />
                  Meetings
                </Link>
              </Button>
              <Button
                asChild
                variant={isActive("/create") ? "hero" : "default"}
                size="sm"
              >
                <Link href="/create">
                  <Plus className="h-4 w-4" />
                  New Meeting
                </Link>
              </Button>
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <Button
              asChild
              variant={isActive("/create") ? "hero" : "default"}
              size="sm"
            >
              {/* <Link href="/sign-in">Login</Link> */}
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
