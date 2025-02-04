export default function Brands() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Trusted by content creators worldwide</h2>
          <p className="text-gray-400">Join thousands of creators who trust KeepRSafe.gg</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="h-12">
              <div className="w-32 h-8 bg-gray-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

