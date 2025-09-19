import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "../services/posts";

export const usePosts = (params = {}) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => postsService.getPosts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
