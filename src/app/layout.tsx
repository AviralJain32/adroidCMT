import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "./StoreProvider";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Adroid CMS - Advanced Conference Management System for Authors & Organizers",
  description: "Adroid CMS is a feature-rich Conference Management System built to simplify paper submissions, reviews, and conference management. With intuitive dashboards for authors and organizers, secure paper management Adroid CMS offers an efficient platform for managing conferences and collaborations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
      <link rel="shortcut icon" href="/favicon.png" />
    </Head>
      <AuthProvider>
        
      <body className={inter.className}>
      <StoreProvider>
        {children}
      <Toaster />
      <Analytics/>
      <SpeedInsights/>
      </StoreProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
  