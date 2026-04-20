import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "HistoryTimeline App",
  description: "Application frontend foundation for the HistoryTimeline platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dim"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full bg-base-100 text-base-content">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
