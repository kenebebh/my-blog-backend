import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 lg:py-32">
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <StaggerContainer>
            <StaggerItem>
              <div className="mb-8 flex justify-center">
                <div className="flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Code2 className="h-4 w-4" />
                  <span>Welcome to Logic & Lines</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Document your{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  developer journey
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mb-8 text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                Every bug fixed, every feature built, every lesson learned. Join
                our community where developers share their experiences, support
                each other, and grow together.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/signup">
                  <Button size="lg" className="group">
                    Join the Community
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" size="lg">
                    Explore Stories
                  </Button>
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        <FadeIn delay={0.8} className="mt-16">
          <div className="mx-auto max-w-5xl">
            <div className="relative rounded-xl bg-card/50 p-2 shadow-2xl backdrop-blur-sm border">
              <div className="rounded-lg bg-gradient-to-br from-muted/50 to-muted/20 p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      1000+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Developer Stories
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">
                      500+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Writers
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">
                      50+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Topics Covered
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
