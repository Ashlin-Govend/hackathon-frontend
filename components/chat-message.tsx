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
    <div className={cn("flex", isUser ? "justify-end" : "justify-start", "py-2")}>
      <Card
        className={cn(
          "max-w-[80%] rounded-lg overflow-hidden break-words",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center shrink-0">
              {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
            </div>
            <div className="min-w-0">
              <div className="font-semibold mb-1 text-sm">
                {isUser ? "You" : "AI Assistant"}
              </div>
              <div className="text-sm whitespace-pre-wrap break-words">
                {message.content}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

