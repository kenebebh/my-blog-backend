import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users";

export const useUsersService = (params = {}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => usersService.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
