import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner"
import './globals.css'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import { getConfig } from "@/wagmi";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velt",
  description: "Decentralized Crypto Lending Platform",
};


export default async function RootLayout(props: { children: ReactNode }) {
  const cookieHeader = await headers();
  const cookieString = cookieHeader.get("cookie") ?? "";
  const initialState = cookieToInitialState(getConfig(), cookieString);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers initialState={initialState}>{props.children}</Providers>
        <Toaster position="top-left"/>
      </body>
    </html>
  )
}
