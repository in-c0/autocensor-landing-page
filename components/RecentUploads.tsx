"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Trash2, RefreshCw, InfoIcon as InfoCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UploadedFile {
  id: string
  name: string
  uploadedAt: string
  expiresAt: string
  analysisResult?: AnalysisResult
}

interface AnalysisResult {
  profanityCount: number
  toxicityScore: number
  // Add other relevant fields from your analysis result
}

export default function RecentUploads() {
  const [recentFiles, setRecentFiles] = useState<UploadedFile[]>([])
  const [isReanalyzing, setIsReanalyzing] = useState<string | null>(null)

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    const mockRecentFiles: UploadedFile[] = [
      {
        id: "1",
        name: "podcast_episode1.mp3",
        uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), // 22 hours from now
        analysisResult: {
          profanityCount: 5,
          toxicityScore: 0.35,
        },
      },
      {
        id: "2",
        name: "interview_raw.wav",
        uploadedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
        analysisResult: {
          profanityCount: 2,
          toxicityScore: 0.15,
        },
      },
    ]

    setRecentFiles(mockRecentFiles)
  }, [])

  const formatTimeLeft = (expiresAt: string) => {
    const now = new Date()
    const expiration = new Date(expiresAt)
    const hoursLeft = Math.round((expiration.getTime() - now.getTime()) / (1000 * 60 * 60))
    return `${hoursLeft} hours`
  }

  const handleDelete = (id: string) => {
    // In a real application, you would call your API to delete the file
    setRecentFiles(recentFiles.filter((file) => file.id !== id))
  }

  const handleReanalyze = async (id: string) => {
    setIsReanalyzing(id)
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update the file with new analysis results
      setRecentFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === id
            ? {
                ...file,
                analysisResult: {
                  profanityCount: Math.floor(Math.random() * 10),
                  toxicityScore: Math.random(),
                },
              }
            : file,
        ),
      )

      // Scroll to the top of the page smoothly
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error("Error re-analyzing file:", error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsReanalyzing(null)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recently Uploaded Files</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoCircle className="w-5 h-5 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">
                Files are stored for 24 hours. During this time, you can re-analyze them without using additional
                credits.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {recentFiles.length === 0 ? (
        <p className="text-gray-500">No recent uploads found.</p>
      ) : (
        <ul className="space-y-4">
          {recentFiles.map((file) => (
            <li key={file.id} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">Uploaded {new Date(file.uploadedAt).toLocaleString()}</p>
                  <div className="flex items-center mt-1 text-sm text-indigo-600">
                    <Clock className="w-4 h-4 mr-1" />
                    Expires in {formatTimeLeft(file.expiresAt)}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleReanalyze(file.id)}
                          variant="outline"
                          size="sm"
                          disabled={isReanalyzing === file.id}
                        >
                          {isReanalyzing === file.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Re-analyze"}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Re-analyze without using additional credits</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button onClick={() => handleDelete(file.id)} variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

