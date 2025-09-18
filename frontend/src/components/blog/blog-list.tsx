"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";
import { Button } from "@/components/ui/button";
import { usePosts } from "../../../hooks/usePosts";

// Mock data - replace with actual API calls using TanStack Query
const mockPosts = [
  {
    id: "1",
    title: "My Journey from Designer to Full-Stack Developer",
    excerpt:
      "How I transitioned from UI/UX design to full-stack development in 18 months, the challenges I faced, and the resources that helped me succeed.",
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
    featured: true,
  },
  {
    id: "2",
    title: "Debugging a Production Issue That Took 3 Days to Solve",
    excerpt:
      "A deep dive into a complex production bug that affected thousands of users, the debugging process, and the lessons learned about system monitoring.",
    author: {
      name: "Marcus Johnson",
      avatar: "/male-developer-avatar.png",
      bio: "Senior Backend Engineer",
    },
    publishedAt: "2024-01-12",
    readTime: "12 min read",
    tags: ["Debugging", "Production", "Backend"],
    likes: 38,
    comments: 8,
    featured: false,
  },
  {
    id: "3",
    title: "Building My First Open Source Project",
    excerpt:
      "The story of creating my first open source library, from initial idea to getting 1000+ GitHub stars, and what I learned about community building.",
    author: {
      name: "Priya Patel",
      avatar: "/female-developer-avatar-indian.jpg",
      bio: "Open Source Contributor",
    },
    publishedAt: "2024-01-10",
    readTime: "6 min read",
    tags: ["Open Source", "Community", "JavaScript"],
    likes: 56,
    comments: 15,
    featured: false,
  },
  {
    id: "4",
    title: "Why I Chose Rust for My Side Project",
    excerpt:
      "Exploring the decision to use Rust for a performance-critical side project, the learning curve, and the benefits I discovered along the way.",
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Systems Programmer",
    },
    publishedAt: "2024-01-08",
    readTime: "10 min read",
    tags: ["Rust", "Performance", "Side Projects"],
    likes: 29,
    comments: 6,
    featured: false,
  },
  {
    id: "5",
    title: "Lessons from My First Tech Interview Failure",
    excerpt:
      "How failing my dream job interview taught me more than any success could, and the preparation strategy that finally got me hired.",
    author: {
      name: "Jordan Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Junior Developer",
    },
    publishedAt: "2024-01-05",
    readTime: "7 min read",
    tags: ["Interviews", "Career", "Learning"],
    likes: 73,
    comments: 22,
    featured: false,
  },
  {
    id: "6",
    title: "Building a Real-Time Chat App with WebSockets",
    excerpt:
      "A technical deep-dive into building a scalable real-time chat application, covering WebSocket implementation, state management, and deployment.",
    author: {
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Full-Stack Developer",
    },
    publishedAt: "2024-01-03",
    readTime: "15 min read",
    tags: ["WebSockets", "Real-time", "Tutorial"],
    likes: 45,
    comments: 11,
    featured: false,
  },
];

export function BlogList() {
  const [posts, setPosts] = useState(mockPosts);
  const [loading, setLoading] = useState(false);

  const { data: postss, isLoading, error } = usePosts();

  console.log(postss);

  // console.log(process.env.NEXT_PUBLIC_BASE_URL);

  // TODO: Replace with TanStack Query
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const featuredPost = posts.find((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-12">
      <div className="container">
        {featuredPost && (
          <div className="mb-16 ">
            <h2 className="text-2xl font-bold mb-8">Featured Story</h2>
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge variant="secondary">Featured</Badge>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(
                              featuredPost.publishedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <Link href={`/blog/${featuredPost.id}`}>
                      <h3 className="text-2xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer text-balance">
                        {featuredPost.title}
                      </h3>
                    </Link>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={
                              featuredPost.author.avatar || "/placeholder.svg"
                            }
                            alt={featuredPost.author.name}
                          />
                          <AvatarFallback>
                            {featuredPost.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">
                            {featuredPost.author.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {featuredPost.author.bio}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{featuredPost.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{featuredPost.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:pl-8">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📚</div>
                        <div className="text-sm text-muted-foreground">
                          Featured Article
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Latest Stories</h2>
          <Button variant="outline">View All</Button>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <StaggerItem key={post.id}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-3">
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

                  <Link href={`/blog/${post.id}`}>
                    <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer text-balance line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                        />
                        <AvatarFallback className="text-xs">
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">
                          {post.author.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
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
