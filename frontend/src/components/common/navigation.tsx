"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { FadeIn } from "../animations";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <FadeIn>
        <div className="flex h-16 items-center justify-between px-6 md:px-12">
          <Link href="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Logic & Lines</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/blog">
              <Button variant="ghost">Blog</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </FadeIn>
    </nav>
  );
}
