"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, MessageSquare } from "lucide-react"
import { LearningMaterials } from "@/components/learning-materials"
import { ChatMessage } from "@/components/chat-message"

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<{ id: string; role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input.trim(),
    }

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const assistantReply = await res.json()

      const assistantMessage = {
        id: assistantReply.id,
        role: assistantReply.role,
        content: assistantReply.content,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("Failed to fetch assistant response", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Learning Assistant</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="col-span-1 lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col h-[600px]">
              <div className="flex-grow overflow-auto mb-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <MessageSquare className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-medium mb-2">Ask me anything!</h3>
                    <p className="text-muted-foreground max-w-md">
                      Ask about any topic you want to learn. I'll provide detailed explanations and related learning
                      materials.
                    </p>
                  </div>
                ) : (
                  messages.map((message) => <ChatMessage key={message.id} message={message} />)
                )}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about any topic..."
                  disabled={isLoading}
                  className="flex-grow"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? "Thinking..." : "Ask"}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Chat Tips</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Ask specific questions for better answers</li>
                    <li>• Try "Explain [topic] in simple terms"</li>
                    <li>• Ask for examples to understand concepts</li>
                    <li>• Request related topics to explore further</li>
                    <li>• Ask "Why is [topic] important?"</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="materials" className="mt-4">
              {messages.some((m) => m.role === "assistant") ? (
                <LearningMaterials messages={messages} />
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No materials yet</h3>
                    <p className="text-muted-foreground text-sm">Ask a question to generate learning materials</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
