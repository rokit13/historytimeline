import { apiClient } from "@/services/api-client";
import type { LoginInput, LoginResponse, MeResponse } from "@/types/auth";

export const authService = {
  login: (credentials: LoginInput) =>
    apiClient.post<LoginResponse>("/auth/login", {
      body: credentials,
    }),
  logout: (token: string) =>
    apiClient.post<void>("/auth/logout", {
      token,
    }),
  me: async (token: string) => {
    const response = await apiClient.get<MeResponse>("/auth/me", {
      token,
    });

    return response.data;
  },
};
