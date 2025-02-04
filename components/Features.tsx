import { Shield, Zap, Smartphone, Repeat } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Optimized for short videos, get results in seconds",
    },
    {
      icon: Shield,
      title: "AI-Powered Detection",
      description: "Accurately detects and filters profanity in multiple languages",
    },
    {
      icon: Smartphone,
      title: "Mobile-Friendly",
      description: "Edit your shorts on-the-go with our responsive design",
    },
    {
      icon: Repeat,
      title: "Batch Processing",
      description: "Censor multiple shorts in one go, perfect for content planning",
    },
  ]

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need for clean content</h2>
          <p className="text-gray-600">
            Powerful features to help you maintain family-friendly content without the hassle
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

