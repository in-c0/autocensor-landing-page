"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, type Sparkles, Shield, Mic, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"

interface Product {
  name: string
  description: string
  longDescription: string
  icon: typeof Sparkles
  url: string
  status: "available" | "coming-soon"
}

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)

  const IconComponent = product.icon

  return (
    <Link
      href={product.status === "available" ? `https://keeprsafe.gg${product.url}` : "#"}
      className={cn("block relative h-full transition-all duration-300", isHovered ? "transform -translate-y-1" : "")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "h-full p-6 bg-white rounded-xl border border-gray-200 transition-shadow duration-300",
          isHovered ? "shadow-xl" : "shadow-sm",
        )}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-100">
            <IconComponent className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
        </div>

        <div className="space-y-3">
          <p className="text-gray-600 text-sm">{isHovered ? product.longDescription : product.description}</p>

          <div className="flex items-center justify-between">
            {product.status === "coming-soon" ? (
              <span className="text-sm text-indigo-600 font-medium">Coming Soon</span>
            ) : (
              <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

