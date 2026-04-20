import { env } from "@/lib/env";
import type { ApiErrorPayload } from "@/types/auth";

type RequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  headers?: HeadersInit;
  token?: string | null;
};

export class ApiError extends Error {
  status: number;
  payload: ApiErrorPayload | null;

  constructor(message: string, status: number, payload: ApiErrorPayload | null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, token, ...init } = options;

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? ((await response.json()) as ApiErrorPayload)
    : null;

  if (!response.ok) {
    throw new ApiError(payload?.message ?? "Request failed.", response.status, payload);
  }

  return payload as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, {
      ...options,
      method: "GET",
    }),
  post: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, {
      ...options,
      method: "POST",
    }),
};
