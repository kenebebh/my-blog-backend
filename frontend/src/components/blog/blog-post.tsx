"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { SlideUp } from "@/components/animations/slide-up";
import { FadeIn } from "@/components/animations/fade-in";

interface BlogPostProps {
  postId: string;
}

// Mock data - replace with actual API calls using TanStack Query
const mockPost = {
  id: "1",
  title: "My Journey from Designer to Full-Stack Developer",
  content: `
# My Journey from Designer to Full-Stack Developer

When I first started my career in tech, I never imagined I'd be writing backend APIs and managing databases. I was a UI/UX designer, comfortable with Figma and Sketch, creating beautiful interfaces and user experiences. But life has a funny way of pushing you out of your comfort zone.

## The Spark of Change

It all started when I was working at a small startup. Our only developer left unexpectedly, and suddenly, I found myself staring at a codebase that needed urgent fixes. The CEO looked at me and said, "You understand how the app should work better than anyone. Can you figure out how to fix this?"

That moment changed everything.

## The Learning Journey

### Month 1-3: HTML, CSS, and JavaScript Basics

I started with the fundamentals. Coming from a design background, HTML and CSS felt natural, but JavaScript was a different beast entirely. I remember spending hours trying to understand why my functions weren't working, only to discover I was missing a semicolon.

**Resources that helped:**
- FreeCodeCamp for structured learning
- MDN Web Docs for reference
- YouTube tutorials for visual explanations

### Month 4-8: React and Frontend Frameworks

Once I got comfortable with vanilla JavaScript, I dove into React. The component-based thinking actually aligned well with my design system experience. I started building small projects, recreating designs I had made in the past.

### Month 9-12: Backend Development

This was the scariest part. Databases, APIs, server management – it all seemed so abstract compared to the visual nature of frontend development. I chose Node.js because I was already familiar with JavaScript.

### Month 13-18: Full-Stack Projects

Finally, I started building complete applications. My first full-stack project was a simple blog (ironically, similar to this platform!). It took me three months to build what an experienced developer could probably create in a week, but I learned so much in the process.

## The Challenges I Faced

### Imposter Syndrome

The biggest challenge wasn't technical – it was mental. I constantly felt like I didn't belong in developer spaces. I was afraid to ask questions, thinking everyone would realize I was "just a designer trying to code."

### Information Overload

The amount of technologies, frameworks, and tools in web development is overwhelming. I made the mistake of trying to learn everything at once instead of focusing on fundamentals.

### Debugging

Coming from design where you can see exactly what's wrong, debugging code felt like detective work. I had to learn to read error messages, use browser dev tools, and think systematically about problems.

## What I Wish I Knew Earlier

1. **Start with projects, not tutorials**: Build things you actually want to use
2. **Don't skip the fundamentals**: Understanding JavaScript deeply is more valuable than knowing 10 frameworks superficially
3. **Join communities**: The developer community is incredibly welcoming once you get past your own fears
4. **Document your journey**: Writing about what you learn helps solidify knowledge

## Where I Am Now

Today, I work as a full-stack developer at a growing tech company. I still use my design skills daily – they help me build better user interfaces and communicate more effectively with design teams. The combination of design and development skills has made me more valuable and opened doors I never expected.

## Advice for Other Career Changers

If you're considering a similar transition, here's my advice:

- **Start now**: There's never a perfect time to begin
- **Be patient with yourself**: Learning to code is hard, and that's okay
- **Find your "why"**: What motivates you to make this change?
- **Build a support network**: Find mentors, join communities, connect with other learners

The journey from designer to developer taught me that career changes are possible at any stage of life. It's challenging, sometimes frustrating, but ultimately incredibly rewarding.

What's your developer journey story? I'd love to hear about it in the comments below.
  `,
  author: {
    name: "Sarah Chen",
    avatar: "/female-developer-avatar.png",
    bio: "Frontend Developer at TechCorp",
  },
  publishedAt: "2024-01-15",
  readTime: "8 min read",
  tags: ["Career Change", "Learning", "Frontend"],
  likes: 42,
  comments: 12,
};

export function BlogPost({ postId }: BlogPostProps) {
  const [post, setPost] = useState(mockPost);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  // TODO: Replace with TanStack Query
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPost(mockPost);
      setLoading(false);
    }, 1000);
  }, [postId]);

  const handleLike = () => {
    setLiked(!liked);
    // TODO: API call to like/unlike post
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <SlideUp>
            <div className="mb-8">
              <Link href="/blog">
                <Button variant="ghost" className="mb-6">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>

              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tight mb-6 text-balance">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                    />
                    <AvatarFallback>
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-lg">
                      {post.author.name}
                    </div>
                    <div className="text-muted-foreground">
                      {post.author.bio}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="sm"
                    onClick={handleLike}
                    className="flex items-center space-x-2"
                  >
                    <Heart
                      className={`h-4 w-4 ${liked ? "fill-current" : ""}`}
                    />
                    <span>{post.likes + (liked ? 1 : 0)}</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </SlideUp>

          <Separator className="mb-8" />

          <FadeIn delay={0.3}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {post.content}
              </div>
            </div>
          </FadeIn>

          <Separator className="my-12" />

          <FadeIn delay={0.5}>
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">
                    Enjoyed this article?
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes + (liked ? 1 : 0)} likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleLike}
                    variant={liked ? "default" : "outline"}
                    className="flex-1"
                  >
                    <Heart
                      className={`mr-2 h-4 w-4 ${liked ? "fill-current" : ""}`}
                    />
                    {liked ? "Liked!" : "Like this article"}
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share with others
                  </Button>
                  <Link href="/write" className="flex-1">
                    <Button className="w-full">Share Your Story Too</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </article>
  );
}
