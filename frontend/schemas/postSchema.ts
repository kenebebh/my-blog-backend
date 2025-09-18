import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z.string().max(300, "Excerpt too long").optional(),
  tags: z.array(z.string()).default([]),
  author: z.string(),
});

export const postUpdateSchema = postSchema.partial();
