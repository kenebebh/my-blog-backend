// lib/types/post.ts
export interface IPost {
  id: string; // unique identifier (string for Next.js routes)
  title: string; // post title
  excerpt: string; // short summary/preview text
  author: {
    firstName: string; // author’s first name
    lastName: string;
    avatar: string; // URL/path to author’s avatar image
    bio: string; // short bio/role
  };
  publishedAt: string; // ISO date string of publication
  readTime: string; // e.g. "8 min read"
  tags: string[]; // list of tag names
  likes: number; // number of likes
  comments: number; // number of comments
  featured: boolean; // whether this is the featured story
}

export interface IPostCreate {
  title: string;
  content: string;
  author: number;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  readTime: string;
  excerpt: string;
}
