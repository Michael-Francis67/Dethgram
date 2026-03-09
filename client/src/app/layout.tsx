import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Dethgram",
  description: "Dethgram is a modern, secure, and user-friendly messaging app built with Next.js and TypeScript. It offers real-time communication, end-to-end encryption, and a sleek interface for seamless chatting experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen ${inter.variable} bg-zinc-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
