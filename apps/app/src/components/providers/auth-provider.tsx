"use client";

import {
  createContext,
  startTransition,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { clearAuthToken, readAuthToken, writeAuthToken } from "@/lib/auth-token";
import { authService } from "@/services/auth-service";
import type { AuthUser, LoginInput } from "@/types/auth";

type AuthStatus = "loading" | "authenticated" | "guest";

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  token: string | null;
  login: (credentials: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const hydrateSession = useEffectEvent(async () => {
    const storedToken = readAuthToken();

    if (!storedToken) {
      startTransition(() => {
        setStatus("guest");
        setUser(null);
        setToken(null);
      });
      return;
    }

    try {
      const authenticatedUser = await authService.me(storedToken);

      startTransition(() => {
        setStatus("authenticated");
        setUser(authenticatedUser);
        setToken(storedToken);
      });
    } catch {
      clearAuthToken();

      startTransition(() => {
        setStatus("guest");
        setUser(null);
        setToken(null);
      });
    }
  });

  useEffect(() => {
    void hydrateSession();
  }, []);

  const login = async (credentials: LoginInput) => {
    const response = await authService.login(credentials);

    writeAuthToken(response.token);

    startTransition(() => {
      setStatus("authenticated");
      setUser(response.user);
      setToken(response.token);
    });
  };

  const logout = async () => {
    if (token) {
      try {
        await authService.logout(token);
      } catch {
        // Local session state should still be cleared if the token is already invalid.
      }
    }

    clearAuthToken();

    startTransition(() => {
      setStatus("guest");
      setUser(null);
      setToken(null);
    });
  };

  return (
    <AuthContext.Provider value={{ status, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
