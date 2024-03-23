import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import PWAModal from "@/components/PWAModal";
import { ThemeProviders } from "@/context/ThemeProvider";

const sansArabic = IBM_Plex_Sans_Arabic({
  style: "normal",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Task Manager",
  description: "Manage your tasks efficiently.",
};

export const viewport: Viewport = {
  themeColor: "#181818",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body
        dir="rtl"
        className={`${sansArabic.className} dark:bg-[#181818] bg-[#FBF9F1] dark:text-white overflow-x-hidden`}
      >
        <PWAModal />
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
