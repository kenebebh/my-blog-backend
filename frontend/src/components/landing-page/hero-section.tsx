import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { FadeIn, Typewriter, SlideUp } from "../animations";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20">
      <div className="relative">
        <div className="mx-auto max-w-4xl text-center flex flex-col justify-center items-center">
          <SlideUp delay={0.2}>
            <div className="mb-8 flex justify-center">
              <div className="flex items-center space-x-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-2 text-sm font-medium text-foreground">
                <Code2 className="h-4 w-4 text-primary" />
                <span>Welcome to Logic & Lines</span>
              </div>
            </div>
          </SlideUp>

          <div className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl h-48 max-w-4xl">
            <Typewriter
              texts={[
                "Document your developer journey",
                "Share knowledge, shape the future",
                "Your ideas, our platform, infinite possibilities",
              ]}
              delay={0.8}
              speed={80}
              pauseBetween={3000}
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            />
          </div>

          <FadeIn delay={2}>
            <p className="mb-8 text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
              Every bug fixed, every feature built, every lesson learned. Join
              our community where developers share their experiences, support
              each other, and grow together.
            </p>
          </FadeIn>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SlideUp delay={2.5}>
              <Link href="/signup">
                <Button size="lg" className="group">
                  Join the Community
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </SlideUp>
            <SlideUp delay={2.7}>
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  Explore Stories
                </Button>
              </Link>
            </SlideUp>
          </div>
        </div>

        <FadeIn delay={3} className="mt-16">
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
