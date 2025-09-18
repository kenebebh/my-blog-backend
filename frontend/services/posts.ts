import { api } from "../lib/api";

export const postsService = {
  // Get all posts with optional filters
  getPosts: async () => {
    const response = await api.get("/posts");
    return response.data;
  },
};
