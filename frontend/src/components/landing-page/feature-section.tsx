import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Lightbulb, Code, Heart, Trophy } from "lucide-react";
import { SlideUp } from "@/components/animations/slide-up";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";

const features = [
  {
    icon: BookOpen,
    title: "Share Your Journey",
    description:
      'Document your coding adventures, from first "Hello World" to complex architectures. Every story matters.',
  },
  {
    icon: Users,
    title: "Learn Together",
    description:
      "Connect with fellow developers, get feedback on your code, and discover new perspectives on problem-solving.",
  },
  {
    icon: Lightbulb,
    title: "Discover Solutions",
    description:
      "Find answers to coding challenges through real developer experiences and battle-tested solutions.",
  },
  {
    icon: Code,
    title: "Code Examples",
    description:
      "Share and explore practical code snippets, best practices, and implementation patterns.",
  },
  {
    icon: Heart,
    title: "Supportive Community",
    description:
      "Join a welcoming space where questions are encouraged and knowledge sharing is celebrated.",
  },
  {
    icon: Trophy,
    title: "Celebrate Wins",
    description:
      "Share your achievements, big and small. From fixing your first bug to landing your dream job.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <SlideUp className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            Why developers choose Logic & Lines
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            More than just a blog - it's a community where your developer
            journey becomes a source of inspiration for others.
          </p>
        </SlideUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <Card className="h-full border-border/50 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
