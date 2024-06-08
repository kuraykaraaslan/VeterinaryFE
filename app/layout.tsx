import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Veterinary Clinic",
  description: "A simple veterinary clinic application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body className="antialiased font-sans min-h-screen flex flex-col flex-1">
        <Navbar />
        <div className="container mx-auto p-4 h-full bg-base-100 flex flex-col flex-1">{children}</div>
      </body>
    </html>
  );
}
