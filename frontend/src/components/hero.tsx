import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Users, BookOpen } from "lucide-react";

export function Hero() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-card">
      <div className="max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Master Backend Development Through
            <span className="text-secondary"> Practical Learning</span>
          </h1>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of developers learning backend technologies through
            hands-on tutorials, real-world projects, and expert insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/articles" className="flex items-center gap-2">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/write" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Write Article
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-foreground">50+</div>
              <div className="text-muted">Articles Published</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-foreground">1,200+</div>
              <div className="text-muted">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Code className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-foreground">15+</div>
              <div className="text-muted">Technologies Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
