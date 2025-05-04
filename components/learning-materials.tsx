"use client"

import { useEffect, useState } from "react"
import type { Message } from "ai"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, LinkIcon, Video } from "lucide-react"

interface LearningMaterialsProps {
  messages: Message[]
  language: string
}

export function LearningMaterials({ messages, language }: LearningMaterialsProps) {
  const lastAiMessage = [...messages].reverse().find((m) => m.role === "assistant")
  const [concepts, setConcepts] = useState("")
  const [reading, setReading] = useState("")
  const [video, setVideo] = useState("")

  const topic = extractTopic(lastAiMessage?.content || "")

  useEffect(() => {
    if (!lastAiMessage || !topic) return

    const fetchData = async () => {
      try {
        const [conceptsRes, readingRes, videoRes] = await Promise.all([
          fetch("/api/key-concepts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic, language }),
          }),
          fetch("/api/recommended-reading", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic, language }),
          }),
          fetch("/api/video-resource", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic, language }),
          }),
        ])

        if (!conceptsRes.ok || !readingRes.ok || !videoRes.ok) {
          throw new Error("One or more Flask responses failed")
        }

        const conceptsJson = await conceptsRes.json()
        const readingJson = await readingRes.json()
        const videoJson = await videoRes.json()

        setConcepts(conceptsJson.key_concepts || "")
        setReading(readingJson.recommended_reading || "")
        setVideo(videoJson.video_resource || "")
      } catch (error) {
        console.error("❌ Failed to fetch learning materials:", error)
        setConcepts("Failed to load key concepts.")
        setReading("Failed to load recommended reading.")
        setVideo("Failed to load video resource.")
      }
    }

    fetchData()
  }, [lastAiMessage, topic, language])

  if (!lastAiMessage) return null

  return (
    <div className="space-y-6 text-lg">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl flex items-center">
            <FileText className="h-6 w-6 mr-2" />
            Key Concepts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-base lg:text-lg">{concepts || "Loading..."}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl flex items-center">
            <BookOpen className="h-6 w-6 mr-2" />
            Recommended Reading
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-base lg:text-lg">{reading || "Loading..."}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl flex items-center">
            <Video className="h-6 w-6 mr-2" />
            Video Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-base lg:text-lg">{video || "Loading..."}</p>
        </CardContent>
      </Card>
    </div>
  )
}

function extractTopic(content: string): string {
  const words = content.split(" ").slice(0, 3).join(" ")
  return words || "CAPS topic"
}
