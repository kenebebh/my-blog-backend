import { api } from "../lib/api";
import { IPost, IPostCreate } from "../lib/types/post";

export const postsService = {
  // Get all posts with optional filters
  getPosts: async (params = {}) => {
    const response = await api.get("/posts", { params });
    return response.data;
  },
  // Get single post by ID
  getPost: async (id: string) => {
    const response = await api.get(`/api/posts/${id}`);
    return response.data;
  },

  // Create new post
  createPost: async (postData: IPostCreate) => {
    const response = await api.post("/api/posts", postData);
    return response.data;
  },

  // Update existing post
  updatePost: async ({ id, ...postData }: { id: string; postData: IPost }) => {
    const response = await api.put(`/api/posts/${id}`, postData);
    return response.data;
  },

  // Delete post
  deletePost: async (id: string) => {
    const response = await api.delete(`/api/posts/${id}`);
    return response.data;
  },

  // Get posts by author
  getPostsByAuthor: async (authorId: string) => {
    const response = await api.get(`/api/posts?authorId=${authorId}`);
    return response.data;
  },
};
