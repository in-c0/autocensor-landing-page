import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AnalysisStatsProps {
  result: {
    fileName: string
    duration: number
    profanityCount: number
    toxicityScore: number
    censoredSegments: Array<{ start: number; end: number; type: string }>
  }
}

export default function AnalysisStats({ result }: AnalysisStatsProps) {
  const totalCensoredDuration = result.censoredSegments.reduce(
    (total, segment) => total + (segment.end - segment.start),
    0,
  )

  const getContentRating = (toxicityScore: number) => {
    if (toxicityScore < 0.2) return { label: "G", color: "bg-green-500" }
    if (toxicityScore < 0.4) return { label: "PG", color: "bg-yellow-500" }
    if (toxicityScore < 0.6) return { label: "PG-13", color: "bg-orange-500" }
    if (toxicityScore < 0.8) return { label: "R", color: "bg-red-500" }
    return { label: "NC-17", color: "bg-purple-500" }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Statistics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <section>
          <h3 className="text-lg font-medium mb-2">File Information</h3>
          <dl className="grid grid-cols-2 gap-1 text-sm">
            <dt className="font-medium">File Name:</dt>
            <dd>{result.fileName}</dd>
            <dt className="font-medium">Duration:</dt>
            <dd>{formatTime(result.duration)}</dd>
          </dl>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-2">Analysis Overview</h3>
          <dl className="grid grid-cols-2 gap-1 text-sm">
            <dt className="font-medium">Profanity Count:</dt>
            <dd>{result.profanityCount}</dd>
            <dt className="font-medium">Overall Toxicity Score:</dt>
            <dd>{(result.toxicityScore * 100).toFixed(2)}%</dd>
            <dt className="font-medium">Content Rating:</dt>
            <dd>
              <Badge variant="outline" className={getContentRating(result.toxicityScore).color}>
                {getContentRating(result.toxicityScore).label}
              </Badge>
            </dd>
          </dl>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-2">Censor Results</h3>
          <dl className="grid grid-cols-2 gap-1 text-sm">
            <dt className="font-medium">Total Censored Segments:</dt>
            <dd>{result.censoredSegments.length}</dd>
            <dt className="font-medium">Total Censored Duration:</dt>
            <dd>{formatTime(totalCensoredDuration)}</dd>
          </dl>
        </section>
      </CardContent>
    </Card>
  )
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

