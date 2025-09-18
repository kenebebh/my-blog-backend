import { Button } from "@/components/ui/button";
import { PenTool, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FadeIn, SlideUp } from "../animations";

export function BlogHeader() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30 px-12">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <SlideUp>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-balance">
              Developer Stories & Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              Discover real experiences from developers around the world. Learn
              from their journeys, challenges, and victories.
            </p>
          </SlideUp>

          <FadeIn
            delay={0.3}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
            <Link href="/write">
              <Button className="group">
                <PenTool className="mr-2 h-4 w-4" />
                Share Your Story
              </Button>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
