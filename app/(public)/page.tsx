import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  interface featureProps {
    title: string;
    description: string;
    icon: string;
  }

  const features: featureProps[] = [
    {
      title: "Comprehensive Learning",
      description:
        "Dive deep into structured, in-depth content that covers everything from fundamentals to advanced topics.",
      icon: "📘",
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed progress analytics, milestones, and goals.",
      icon: "📊",
    },
    {
      title: "Interactive Learning",
      description:
        "Engage with quizzes, challenges, and hands-on exercises that make learning fun and effective.",
      icon: "🧠",
    },
    {
      title: "Community Support",
      description:
        "Connect with peers, mentors, and experts in a supportive community to grow together.",
      icon: "🤝",
    },
  ];

  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center space-y-8 text-center">
          <Badge variant="outline">The future of online education</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="max-w-[800px] text-muted-foreground md:text-xl">
            Dicover a new way to learn with our modern, interactive learning
            management system. Access high quality courses from anywhere, at any
            time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/courses" className={buttonVariants({ size: "lg" })}>
              Explore Courses
            </Link>
            <Link
              href="/login"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              SignIn
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-30">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
