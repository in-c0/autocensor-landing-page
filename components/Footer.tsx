import Link from "next/link"

export default function Footer() {
  const products = [
    {
      name: "AutoCensor",
      description: "Drag-and-drop profanity & toxicity filter for video/audio files",
      url: "/autocensor",
    },
    { name: "VoiceChanger", description: "Ideal for realtime streaming", url: "/voicechanger" },
    {
      name: "Micshield",
      description: "For outgoing toxicity (ideal for realtime streaming) (Coming soon!)",
      url: "/micshield",
    },
    {
      name: "Audioshield",
      description: "For incoming toxicity (ideal for realtime streaming) (Coming soon!)",
      url: "/audioshield",
    },
  ]

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{product.description}</p>
              <Link href={`https://keeprsafe.gg${product.url}`} className="text-purple-400 hover:text-purple-300">
                Learn more
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} KeepRSafe.gg. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

