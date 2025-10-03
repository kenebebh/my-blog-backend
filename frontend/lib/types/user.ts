// lib/types/post.ts
export interface IUser {
  id: string; // unique identifier (string for Next.js routes)
  firstName: string; // post title
  lastName: string; // short summary/preview text
  email: string; // user's email
  profilePicture: {
    secure_url: string; // URL/path to user's avatar
    public_id: string; // public ID for image management
  };
  role: "reader" | "admin" | "author";
}

export interface IUserCreate {
  id: string; // unique identifier (string for Next.js routes)
  firstName: string; // post title
  lastName: string; // short summary/preview text
  email: string; // users email
  password: string;
  profilePicture: {
    secure_url: string; // URL/path to uer's avatar
    public_id: string; // public ID for image management
  };
  role: "reader" | "admin" | "author";
}
