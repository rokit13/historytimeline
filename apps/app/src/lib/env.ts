function stripTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "HistoryTimeline App",
  apiBaseUrl: stripTrailingSlash(
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api",
  ),
};
