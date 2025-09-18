import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "../services/posts";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => postsService.getPosts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
