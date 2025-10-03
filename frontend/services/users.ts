import { api } from "../lib/api";
import { IUser, IUserCreate } from "../lib/types/user";

export const usersService = {
  // Get all users
  getUsers: async (params = {}) => {
    const response = await api.get("/users", { params });
    return response.data;
  },
};
