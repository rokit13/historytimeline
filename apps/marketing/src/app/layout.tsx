import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "HistoryTimeline",
  description: "Marketing site foundation for the HistoryTimeline platform.",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
