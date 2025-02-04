"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TranscriptProps {
  transcript: Array<{
    start: number
    end: number
    text: string
    isCensored: boolean
  }>
  currentTime: number
}

export default function Transcript({ transcript, currentTime }: TranscriptProps) {
  const [revealedWords, setRevealedWords] = useState<Set<number>>(new Set())

  const toggleReveal = (index: number) => {
    setRevealedWords((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const renderText = (segment: TranscriptProps["transcript"][0], index: number) => {
    if (!segment.isCensored) return segment.text

    const words = segment.text.split(" ")
    return words.map((word, wordIndex) => {
      const censoredWords = ["slushy", "damp", "worship"]
      if (censoredWords.includes(word.toLowerCase())) {
        return (
          <Button
            key={`${index}-${wordIndex}`}
            variant="ghost"
            className={`px-2 py-1 text-sm inline-block ${
              revealedWords.has(index) ? "bg-red-100 hover:bg-red-200" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => toggleReveal(index)}
          >
            {revealedWords.has(index) ? word : "[CENSORED]"}
          </Button>
        )
      }
      return <span key={`${index}-${wordIndex}`}>{word} </span>
    })
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6 h-96 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Transcript</h2>
      {transcript.map((segment, index) => (
        <p
          key={index}
          className={`mb-2 ${currentTime >= segment.start && currentTime < segment.end ? "bg-yellow-100" : ""}`}
        >
          [{formatTime(segment.start)} - {formatTime(segment.end)}] {renderText(segment, index)}
        </p>
      ))}
    </div>
  )
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

