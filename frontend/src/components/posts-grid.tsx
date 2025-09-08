import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  slug: string;
}

interface PostsGridProps {
  posts: Post[];
}

export function PostsGrid({ posts }: PostsGridProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="bg-card border-border hover:shadow-lg transition-shadow group"
        >
          <CardHeader className="pb-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <Link href={`/articles/${post.slug}`}>
              <h3 className="text-xl font-semibold text-card-foreground group-hover:text-secondary transition-colors text-balance">
                {post.title}
              </h3>
            </Link>
          </CardHeader>

          <CardContent className="pb-3">
            <p className="text-muted text-sm leading-relaxed text-pretty">
              {post.excerpt}
            </p>
          </CardContent>

          <CardFooter className="pt-3 border-t border-border/50">
            <div className="flex items-center justify-between w-full text-xs text-muted">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
