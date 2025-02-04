import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import WaveBackground from "@/components/WaveBackground"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AutoCensor - AI-Powered Content Filter | KeepRSafe.gg",
  description:
    "Automatically detect and filter profanity from your videos and audio files. Perfect for content creators, streamers, and YouTubers.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <WaveBackground />
        {children}
      </body>
    </html>
  )
}

