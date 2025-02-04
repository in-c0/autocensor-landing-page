import Image from "next/image"
import { Button } from "@/components/ui/button"
import UploadModal from "./UploadModal"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              AutoCensor for Shorts: Clean Content in Seconds
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Perfect for TikTok, YouTube Shorts, and Instagram Reels creators. Filter profanity and toxicity from your
              short videos quickly and easily.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <UploadModal />
              <Button variant="outline" asChild>
                <Link href="/analyze/demo">View demo</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center space-x-2 text-sm">
              <span className="inline-block bg-green-100 text-green-600 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                Special
              </span>
              <span className="text-gray-700 font-medium">80% discount limited time offer!</span>
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required</p>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7L3ICnxiH1sNSPUora4vZy3L3KvWec.png"
                alt="Video editing software showing content censoring in action"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3">
              <div className="bg-green-100 text-green-700 p-2 rounded-full">✓</div>
              <p className="text-sm font-medium">AI-powered detection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

