export type AuthUser = {
  id: number;
  name: string;
  email: string;
  created_at: string | null;
  updated_at: string | null;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  token_type: "bearer";
  expires_in: number;
  user: AuthUser;
};

export type MeResponse = {
  data: AuthUser;
};

export type ApiErrorPayload = {
  message?: string;
  errors?: Record<string, string[]>;
};
