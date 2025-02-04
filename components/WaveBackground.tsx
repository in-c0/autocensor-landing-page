"use client"

import { useEffect, useRef } from "react"

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Wave parameters
    const waves = Array.from({ length: 8 }, (_, i) => ({
      amplitude: 20 + Math.random() * 20,
      frequency: 0.02 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2,
      y: (canvas.height * (i + 1)) / 9,
    }))

    // Animation
    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 0.2 // 20% opacity

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, wave.y)

        // Draw wave
        for (let x = 0; x < canvas.width; x++) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
          ctx.lineTo(x, y)
        }

        // Style
        ctx.strokeStyle = "#4F46E5" // Indigo color matching the theme
        ctx.lineWidth = 2
        ctx.stroke()

        // Update phase for animation
        wave.phase += 0.02
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: "white" }}
    />
  )
}

