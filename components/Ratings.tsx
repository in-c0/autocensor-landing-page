import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Ratings() {
  return (
    <section className="py-16 bg-white border-y border-gray-100 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4">
            In Progress
          </Badge>
          <h2 className="text-2xl font-bold mb-2">Reviews coming soon</h2>
          <p className="text-gray-600">We're collecting reviews from our early adopters. Check back soon!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gray-200" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">Want to share your experience? Contact us at support@keeprsafe.gg</p>
        </div>
      </div>
    </section>
  )
}

