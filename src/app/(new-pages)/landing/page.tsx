import { Video, Shield, Users, Zap, Calendar, Play } from "lucide-react";
import heroImage from "@/assets/hero-meeting.jpg";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Navigation,
} from "@/components";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const features = [
  {
    icon: Video,
    title: "HD Video Quality",
    description:
      "Crystal clear video calls with up to 4K resolution for professional meetings",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "End-to-end encryption ensures your conversations stay confidential",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Host meetings with up to 100 participants and collaborate in real-time",
  },
  {
    icon: Zap,
    title: "Instant Meetings",
    description: "Start or join meetings in seconds with a single click",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Connect Teams
              </span>
              <br />
              Anywhere, Anytime
            </h1>
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
      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Everything You Need for Better Meetings
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features designed for modern teams
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
            >
              <CardHeader>
                <div className="w-fit rounded-lg bg-gradient-to-r from-primary to-accent p-3">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[var(--shadow-elegant)]">
          <CardContent className="relative z-10 py-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Ready to Transform Your Meetings?
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/90">
              Join thousands of teams already using MeetHub for seamless
              collaboration
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-background text-foreground shadow-lg hover:bg-background/90"
            >
              <Link href="/create">Get Started Free</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default LandingPage;
