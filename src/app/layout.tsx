import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import FloatingShardsBackground from "@/components/backgrounds/FloatingShardsBackground"
import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Baha Zlitni - Portfolio",
  description: "Works, projects, and more...",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header><Navbar /></header>
        <FloatingShardsBackground/>
        <main id="__main__">{children}</main>
        <Footer />        
      </body> 
    </html>
  )
}
