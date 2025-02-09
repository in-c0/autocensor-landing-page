"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function FileUpload() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi"],
      "audio/*": [".mp3", ".wav", ".ogg", ".m4a"],
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100 MB
  })

  const processFile = async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      console.log("Sending file to server...")
      const response = await fetch("https://keepr-autocensor.fly.dev/transcribe", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Error processing file")
      }

      const result = await response.json()
      console.log("Received result from server:", result)

      // Store the analysis result in sessionStorage
      sessionStorage.setItem("analysisResult", JSON.stringify(result))
      console.log("Analysis result stored in sessionStorage")

      // Navigate to the analyze page
      router.push("/analyze")
    } catch (err) {
      console.error("Error processing file:", err)
      setError(`An error occurred while processing the file: ${err.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-indigo-600 bg-indigo-50" : "border-gray-300 hover:border-indigo-400"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">Tap to select a video or audio file</p>
        <p className="mt-1 text-xs text-gray-500">Max file size: 100 MB</p>
      </div>

      {file && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}

      {isProcessing && (
        <div className="mt-4">
          <Progress value={50} className="w-full" /> {/* Optionally show a spinner or progress bar */}
          <p className="mt-2 text-sm text-gray-600">Processing...</p>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center text-red-600">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <Button onClick={processFile} disabled={!file || isProcessing} className="mt-4 w-full">
        {isProcessing ? "Processing..." : "Analyze File"}
      </Button>

      <div className="mt-4 flex items-start text-gray-600">
        <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <p className="text-xs">
          Your file will be securely processed and stored for 24 hours to allow for adjustments. After this period, it
          will be automatically deleted from our servers.
        </p>
      </div>
    </div>
  )
}

