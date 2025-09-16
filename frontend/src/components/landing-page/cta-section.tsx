import { Button } from "@/components/ui/button";
import { ArrowRight, PenTool } from "lucide-react";
import Link from "next/link";
import { SlideUp, BounceIn } from "../animations";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <SlideUp>
            <BounceIn delay={0.2} className="mb-8 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                <PenTool className="h-8 w-8 text-secondary" />
              </div>
            </BounceIn>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-balance">
              Ready to share your developer story?
            </h2>

            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              Your journey matters. Whether you're debugging your first function
              or architecting complex systems, your experience can inspire and
              help other developers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button size="lg" className="group">
                  Start Writing Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  Read Developer Stories
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </div>
    </section>
  );
}
