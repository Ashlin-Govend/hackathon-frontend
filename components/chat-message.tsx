import type { Message } from "ai"
import { User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <Card className={cn("max-w-[80%]", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
              {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
            </div>
            <div>
              <div className="font-medium mb-1">{isUser ? "You" : "AI Assistant"}</div>
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
