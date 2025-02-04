// AnalyzeResult.tsx
"use client"

import { useState, useEffect } from "react"
import AudioPlayer from "./AudioPlayer"
import Transcript from "./Transcript"
import AnalysisStats from "./AnalysisStats"
import CensoredWordlist from "./CensoredWordlist"
import FeedbackForm from "./FeedbackForm"
import RecentUploads from "./RecentUploads"

interface AnalysisResult {
  fileName: string
  duration: number
  profanityCount: number
  toxicityScore: number
  audioUrl: string
  censoredSegments: Array<{
    start: number
    end: number
    type: string
    text: string
  }>
  transcript: Array<{
    start: number
    end: number
    text: string
    isCensored: boolean
  }>
}

export default function AnalyzeResult({ isDemo = false }: { isDemo?: boolean }) {
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const mockResult: AnalysisResult = {
    fileName: "sample1.wav",
    duration: 13.69,
    profanityCount: 3,
    toxicityScore: 0.35,
    audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sample1-bgkC09WpU3GXFQTw4XI29MOktozF05.wav",
    censoredSegments: [
      { start: 1.0, end: 1.5, type: "euphemism", text: "slushy" },
      { start: 2.84, end: 3.1599998, type: "inappropriate", text: "damp" },
      { start: 9.719999, end: 10.12, type: "sensitive", text: "worship" },
    ],
    transcript: [
      { start: 0.19999999, end: 1.0, text: "Going along", isCensored: false },
      { start: 1.0, end: 2.12, text: "slushy country roads", isCensored: true },
      { start: 2.12, end: 2.84, text: "and speaking to", isCensored: false },
      { start: 2.84, end: 3.6599998, text: "damp audiences", isCensored: true },
      { start: 3.8, end: 4.52, text: "in drafty", isCensored: false },
      { start: 4.52, end: 5.16, text: "school rooms", isCensored: false },
      { start: 5.16, end: 5.7999997, text: "day after day", isCensored: false },
      { start: 5.7999997, end: 6.3599997, text: "for a fortnight", isCensored: false },
      { start: 6.72, end: 7.72, text: "he'll have", isCensored: false },
      { start: 7.72, end: 8.76, text: "to put in an appearance", isCensored: false },
      { start: 8.76, end: 10.12, text: "at some place of worship", isCensored: true },
      { start: 10.12, end: 11.08, text: "on Sunday morning", isCensored: false },
      { start: 11.4, end: 12.12, text: "and he can come to", isCensored: false },
      { start: 12.12, end: 13.4, text: "us immediately afterwards", isCensored: false },
    ],
  }

  useEffect(() => {
    if (isDemo) {
      setResult(mockResult)
    } else {
      // Try to get the analysis result stored in sessionStorage.
      const storedResult = sessionStorage.getItem("analysisResult")
      if (storedResult) {
        setResult(JSON.parse(storedResult))
        // Optionally clear the stored result if it's only meant for one-time use:
        sessionStorage.removeItem("analysisResult")
      } else {
        setError("No analysis result found. Please try uploading a file again.")
      }
    }
  }, [isDemo])

  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  if (!result) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {result.audioUrl ? (
            <AudioPlayer
              audioSrc={result.audioUrl}
              censoredSegments={result.censoredSegments}
              onTimeUpdate={setCurrentTime}
            />
          ) : (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
              <p className="font-bold">Audio Unavailable</p>
              <p>
                The audio file for this analysis is not available. This might be due to the file being deleted or an
                error in processing.
              </p>
            </div>
          )}
          <AnalysisStats result={result} />
        </div>
        <div>
          <Transcript transcript={result.transcript} currentTime={currentTime} />
          <CensoredWordlist censoredSegments={result.censoredSegments} />
        </div>
      </div>
      <RecentUploads />
      <div className="max-w-2xl mx-auto">
        <FeedbackForm />
      </div>
    </div>
  )
}

