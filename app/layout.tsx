import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/ThemeProvider";
import PWAModal from "@/components/PWAModal";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body
        className={`${inter.className} dark:bg-[#181818] bg-[#FBF9F1] dark:text-white overflow-x-hidden`}
      >
        <PWAModal />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
