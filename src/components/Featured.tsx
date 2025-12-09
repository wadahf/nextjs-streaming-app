import { Shield, Users, Video, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./";

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

const Featured = () => {
  return (
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
  );
};

export default Featured;
