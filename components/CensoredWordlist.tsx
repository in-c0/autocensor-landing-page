"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Eye, EyeOff } from "lucide-react"
import Soundboard from "./Soundboard"

interface CensoredWord {
  text: string
  action: string
}

interface CensoredWordlistProps {
  censoredSegments: Array<{ start: number; end: number; type: string; text: string }>
}

export default function CensoredWordlist({ censoredSegments }: CensoredWordlistProps) {
  const [wordlist, setWordlist] = useState<CensoredWord[]>(
    censoredSegments.map((segment) => ({ text: segment.text, action: "Beep" })),
  )
  const [showWords, setShowWords] = useState(true)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const handleUpdate = () => {
    // In a real application, you would send this updated wordlist to your backend
    console.log("Updated wordlist:", wordlist)
    alert("Wordlist updated successfully!")
  }

  const handleRemoveWord = (index: number) => {
    setWordlist(wordlist.filter((_, i) => i !== index))
  }

  const handleAddWord = () => {
    setWordlist([...wordlist, { text: "", action: "Beep" }])
  }

  const toggleShowWords = () => {
    setShowWords(!showWords)
  }

  const maskWord = (word: string) => {
    const halfLength = Math.ceil(word.length / 2)
    return word.slice(0, halfLength) + "*".repeat(word.length - halfLength)
  }

  const handleEditWord = (index: number) => {
    setEditingIndex(index)
  }

  const handleSaveWord = () => {
    setEditingIndex(null)
  }

  const handleSelectSound = (index: number, sound: string) => {
    const newWordlist = [...wordlist]
    newWordlist[index].action = sound
    setWordlist(newWordlist)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Censored Wordlist</h2>
        <Button onClick={toggleShowWords} variant="outline" size="sm">
          {showWords ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {showWords ? "Hide" : "Show"}
        </Button>
      </div>
      <ul className="space-y-4 mb-4">
        {wordlist.map((word, index) => (
          <li key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <input
                type="text"
                value={showWords ? word.text : maskWord(word.text)}
                onChange={(e) => {
                  const newWordlist = [...wordlist]
                  newWordlist[index].text = e.target.value
                  setWordlist(newWordlist)
                }}
                className="border rounded px-2 py-1 w-full mr-2"
                readOnly={!showWords || editingIndex !== index}
              />
              {editingIndex === index ? (
                <Button onClick={handleSaveWord} variant="outline" size="sm">
                  Save
                </Button>
              ) : (
                <Button onClick={() => handleEditWord(index)} variant="outline" size="sm">
                  Edit
                </Button>
              )}
              <Button onClick={() => handleRemoveWord(index)} variant="outline" size="icon">
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium mb-1">Action:</p>
              <Soundboard selectedSound={word.action} onSelectSound={(sound) => handleSelectSound(index, sound)} />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <Button onClick={handleAddWord} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Word
        </Button>
        <Button onClick={handleUpdate}>Update Wordlist</Button>
      </div>
    </div>
  )
}

