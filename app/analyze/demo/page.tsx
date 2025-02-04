import AnalyzeResult from "@/components/AnalyzeResult"

export default function DemoAnalyzePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Demo Analysis Results</h1>
      <AnalyzeResult isDemo={true} />
    </div>
  )
}

