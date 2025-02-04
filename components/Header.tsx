"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import UploadModal from "./UploadModal"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const handleSmoothScroll = (e: Event) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const targetId = target.getAttribute("href")?.slice(1)
      if (targetId) {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll)
      })
    }
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="bg-yellow-400 text-center py-1 px-4 text-sm font-medium">🚧 Website Under Construction 🚧</div>
      <div
        className={`bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="https://keeprsafe.gg" className="flex-shrink-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/K-GIqkKpZds3NKpZEW2DbrHX5Vlhw4wx.png"
                  alt="KEEPR"
                  className="h-6"
                />
              </Link>
              <div className="w-px h-6 bg-gray-200" />
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                AutoCensor
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </a>
              <a href="#products" className="text-gray-600 hover:text-gray-900">
                Products
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <UploadModal />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

