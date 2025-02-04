"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState<"bug" | "feedback">("feedback")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isVisible, setIsVisible] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ feedbackType, title, description, email })

    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.1) {
        // 90% success rate for demo
        setSubmitStatus("success")
      } else {
        setSubmitStatus("error")
      }
    }, 1000)

    // Reset form
    setTitle("")
    setDescription("")
    setEmail("")
  }

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Button onClick={toggleVisibility} variant="outline" className="w-full mb-4">
        {isVisible ? "Hide Feedback Form" : "Report a Bug or Give Feedback"}
      </Button>
      {isVisible && (
        <>
          <h2 className="text-xl font-semibold mb-4">Report a Bug or Give Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <RadioGroup
              defaultValue="feedback"
              onValueChange={(value) => setFeedbackType(value as "bug" | "feedback")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bug" id="bug" />
                <Label htmlFor="bug">Bug</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="feedback" id="feedback" />
                <Label htmlFor="feedback">Feedback</Label>
              </div>
            </RadioGroup>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Brief description"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide more details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email for follow-up"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button type="submit">Submit</Button>

            {submitStatus === "success" && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-2" />
                Thank you for your {feedbackType}. We'll review it shortly.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="flex items-center text-red-600">
                <AlertCircle className="mr-2" />
                There was an error submitting your {feedbackType}. Please try again.
              </div>
            )}
          </form>
        </>
      )}
    </div>
  )
}

