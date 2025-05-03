import type { Message } from "ai"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, LinkIcon, Video } from "lucide-react"

interface LearningMaterialsProps {
  messages: Message[]
}

export function LearningMaterials({ messages }: LearningMaterialsProps) {
  // In a real app, you would generate these materials based on the conversation
  // For now, we'll create some sample materials based on the last AI message
  const lastAiMessage = [...messages].reverse().find((m) => m.role === "assistant")

  if (!lastAiMessage) return null

  // Extract a topic from the last message (simplified)
  const topic = extractTopic(lastAiMessage.content)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Key Concepts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• {generateKeyConcept(topic, 1)}</li>
            <li>• {generateKeyConcept(topic, 2)}</li>
            <li>• {generateKeyConcept(topic, 3)}</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Recommended Reading
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <LinkIcon className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
              <span>{generateReading(topic, 1)}</span>
            </li>
            <li className="flex items-start">
              <LinkIcon className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
              <span>{generateReading(topic, 2)}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Video className="h-4 w-4 mr-2" />
            Video Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <LinkIcon className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
              <span>{generateVideo(topic, 1)}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper functions to generate sample content
function extractTopic(content: string): string {
  // In a real app, you would use NLP to extract the main topic
  // For now, just take the first few words
  const words = content.split(" ").slice(0, 3).join(" ")
  return words || "the topic"
}

function generateKeyConcept(topic: string, index: number): string {
  const concepts = [
    `Understanding the fundamentals of ${topic}`,
    `How ${topic} relates to real-world applications`,
    `Advanced concepts in ${topic} studies`,
  ]

  return concepts[index - 1] || `Concept ${index} about ${topic}`
}

function generateReading(topic: string, index: number): string {
  const readings = [
    `"Introduction to ${topic}" - A comprehensive guide for beginners`,
    `"Advanced ${topic}: Theory and Practice" - For deeper understanding`,
  ]

  return readings[index - 1] || `Reading ${index} about ${topic}`
}

function generateVideo(topic: string, index: number): string {
  return `"${topic} Explained" - Educational video series (45 min)`
}
