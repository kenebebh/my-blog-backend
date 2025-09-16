import Link from "next/link";
import { Code2, Github, Twitter, Linkedin } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

export default function Footer() {
  return (
    <FadeIn>
      <footer className="border-t bg-muted/30">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Code2 className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">Logic & Lines</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Document your developer journey. Every bug fixed, every feature
                built, every lesson learned.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Join Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guidelines"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Writing Guidelines
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/help"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 Logic & Lines. Built with ❤️ for the developer
              community.
            </p>
          </div>
        </div>
      </footer>
    </FadeIn>
  );
}
