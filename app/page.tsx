import Header from "../components/Header"
import Hero from "../components/Hero"
import Ratings from "../components/Ratings"
import Features from "../components/Features"
import Pricing from "../components/Pricing"
import Brands from "../components/Brands"
import Footer from "../components/Footer"
import MobileFeature from "../components/MobileFeature"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {" "}
        {/* Increased top padding to account for the fixed header */}
        <Hero />
        <Ratings />
        <Features />
        <MobileFeature />
        <Pricing />
        <Brands />
      </main>
      <Footer />
    </div>
  )
}

