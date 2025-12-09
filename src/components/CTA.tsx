import Link from "next/link";
import { Button, Card, CardContent } from "./";

const CTA = () => {
  return (
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
  );
};

export default CTA;
