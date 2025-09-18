import { z } from "zod";

// User schemas
export const userSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  bio: z.string().max(500, "Bio too long").optional(),
  role: z.enum(["user", "admin"]).default("user"),
});

export const userUpdateSchema = userSchema.partial();
