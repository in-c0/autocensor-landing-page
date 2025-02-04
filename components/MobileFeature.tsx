import { Smartphone, Cloud, Zap } from "lucide-react"

export default function MobileFeature() {
  return (
    <section className="py-12 bg-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Perfect for On-the-Go Creators</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Smartphone className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mobile-Friendly Interface</h3>
            <p className="text-gray-600">Edit your shorts anywhere, anytime with our responsive design</p>
          </div>
          <div className="text-center">
            <Cloud className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cloud Processing</h3>
            <p className="text-gray-600">No need for a powerful device - we handle the heavy lifting</p>
          </div>
          <div className="text-center">
            <Zap className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick Edits</h3>
            <p className="text-gray-600">Make last-minute changes to your content in seconds</p>
          </div>
        </div>
      </div>
    </section>
  )
}

