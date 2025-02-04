"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import FileUpload from "./FileUpload"

export default function UploadModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-6 px-8"
      >
        Try for free
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Audio File</DialogTitle>
          <DialogDescription>
            Choose an audio file to upload for analysis. Supported formats: MP3, WAV, OGG, M4A.
          </DialogDescription>
        </DialogHeader>
        <FileUpload />
      </DialogContent>
    </Dialog>
  )
}

