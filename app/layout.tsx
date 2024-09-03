import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import "../styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'EmotionDo',
  description: 'A simple to-do list app with sentiment analysis powered by FastAPI and Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}