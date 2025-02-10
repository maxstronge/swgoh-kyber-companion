import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";
import './globals.css';

export const metadata: Metadata = {
  title: "SWGOH Companion",
  description: "An easy-to-use guide for SWGOH rankings and factions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-950 text-gray-100 font-raleway">
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
