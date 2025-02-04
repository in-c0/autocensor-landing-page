"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, Clock } from "lucide-react"

const TIMER_DURATION = 694 * 60 * 60 * 1000 // 694 hours in milliseconds

const plans = [
  {
    name: "Basic (Web)",
    price: "Free",
    icon: "📱",
    features: [
      "Up to 60 minutes per month processing",
      "Supports up to 1 hour length videos",
      "Custom censored wordlist",
    ],
    notIncluded: ["Custom AI model selection", "Batch processing", "Priority support"],
  },
  {
    name: "Pro (Web)",
    price: "$15/month",
    icon: "🎥",
    features: [
      "500 minutes per month processing",
      "Supports up to 5 hours length videos",
      "Custom censored wordlist",
      "Custom AI model selection",
      "Batch processing up to 10 videos",
      "24-hour email support",
    ],
    notIncluded: ["API access"],
    hoverInfo: "Pay-as-you-go ($0.05 per minute) after 500 minutes per month processing",
  },
  {
    name: "Lifetime (Desktop)",
    price: "$79 One-off",
    icon: "🏆",
    features: [
      "Unlimited* shorts",
      "Unlimited* file length",
      "Advanced AI-powered toxicity detection",
      "Custom censored wordlist",
      "Custom AI model selection",
      "Unlimited* batch processing",
      "Priority customer support",
      "API access",
    ],
    note: "* Unlimited only if using local CPU/GPU. Offloading to our web servers is subject to your Basic/Pro plan subscription.",
  },
]

export default function Pricing() {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1000
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => {
    const days = Math.floor(time / (24 * 60 * 60 * 1000))
    const hours = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000))
    const seconds = Math.floor((time % (60 * 1000)) / 1000)

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Limited Time Offer
          </div>
          <h2 className="text-3xl font-bold mb-4">Get lifetime access today</h2>
          <p className="text-gray-600">Join our first 100 early adopters and get an exclusive lifetime deal</p>
        </div>

        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-8 text-center text-white relative">
            <h3 className="text-2xl font-bold mb-2">Pro Plan - Limited Time Offer</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl font-bold">$3</span>
              <span className="text-lg line-through opacity-75">$15</span>
            </div>
            <p className="text-indigo-100 mb-4">80% discount for early adopters</p>
            <div className="absolute top-2 right-2 bg-yellow-400 text-indigo-900 px-2 py-1 rounded text-xs font-semibold flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="p-8">
            <ul className="space-y-4 mb-8">
              {[
                "500 minutes per month processing",
                "Supports up to 5 hours length videos",
                "Custom censored wordlist",
                "Custom AI model selection",
                "Batch processing up to 10 videos",
                "24-hour email support",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-lg">Get Pro Access Now</Button>
            <p className="text-center text-sm text-gray-500 mt-4">Limited time offer</p>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Pricing</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.name} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col">
                <div className="text-center mb-4">
                  <span className="text-4xl">{plan.icon}</span>
                  <h4 className="text-xl font-semibold mt-2">{plan.name}</h4>
                  <p className="text-2xl font-bold text-indigo-600 mt-2">{plan.price}</p>
                  {plan.hoverInfo && (
                    <div className="relative group">
                      <span className="text-sm text-gray-500 cursor-help underline decoration-dotted">More info</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-48 text-center">
                        {plan.hoverInfo}
                      </div>
                    </div>
                  )}
                </div>
                <ul className="space-y-2 mb-4 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded?.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-500">
                      <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.note && <p className="text-xs text-gray-500 mt-4">{plan.note}</p>}
                {plan.name === "Lifetime (Desktop)" ? (
                  <Button variant="outline" className="w-full mt-4" disabled>
                    Coming Soon
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full mt-4">
                    Choose Plan
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

