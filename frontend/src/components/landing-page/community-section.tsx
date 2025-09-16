import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { SlideUp } from "@/components/animations/slide-up";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    avatar: "/female-developer-avatar.png",
    content:
      "Logic & Lines helped me document my transition from designer to developer. The community feedback on my articles gave me confidence to keep learning.",
  },
  {
    name: "Marcus Johnson",
    role: "Full Stack Engineer",
    avatar: "/male-developer-avatar.png",
    content:
      "I love how this platform celebrates both successes and failures. Reading about others' debugging journeys helped me through my toughest projects.",
  },
  {
    name: "Priya Patel",
    role: "Backend Developer",
    avatar: "/female-developer-avatar-indian.jpg",
    content:
      "The supportive community here is incredible. I shared my first open source contribution story and received so much encouragement to do more.",
  },
];

export default function CommunitySection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <SlideUp className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            Stories from our community
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Real developers sharing real experiences. See how Logic & Lines has
            helped others in their coding journey.
          </p>
        </SlideUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
