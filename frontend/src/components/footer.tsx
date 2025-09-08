import Link from "next/link";
import { BookOpen, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-secondary" />
              <span className="text-lg font-bold text-card-foreground">
                DevBlog
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-md">
              A modern platform for learning backend development through
              practical tutorials, real-world projects, and community-driven
              content.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link
                href="#"
                className="text-muted hover:text-secondary transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted hover:text-secondary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted hover:text-secondary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/articles"
                  className="text-muted hover:text-secondary transition-colors"
                >
                  All Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/write"
                  className="text-muted hover:text-secondary transition-colors"
                >
                  Write Article
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/categories/nodejs"
                  className="text-muted hover:text-secondary transition-colors"
                >
                  Node.js
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/database"
                  className="text-muted hover:text-secondary transition-colors"
                >
                  Databases
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/api"
                  className="text-muted hover:text-secondary transition-colors"
                >
                  APIs
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/devops"
                  className="text-muted hover:text-secondary transition-colors"
                >
                  DevOps
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-muted text-sm">
            © 2024 DevBlog. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
