import { StreamingTextResponse } from "ai"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Get the last user message
  const lastUserMessage = messages.filter((m: any) => m.role === "user").pop()

  // Create a system prompt that instructs the AI to provide educational content
  const systemPrompt = `
    You are an educational AI assistant designed to help users learn about various topics.
    
    When responding to questions:
    1. Provide clear, accurate explanations suitable for the user's level of understanding
    2. Include relevant examples to illustrate concepts
    3. Suggest related topics or concepts that might interest the user
    4. If appropriate, mention resources for further learning
    
    Always be encouraging and supportive of the learning process.
  `

  // Create a prompt that includes the user's message and instructions to generate learning materials
  const prompt = `
    ${lastUserMessage.content}
    
    Please provide:
    1. A thorough explanation of the topic
    2. Key concepts and definitions
    3. Real-world examples or applications
    4. Related topics that might be interesting to explore
  `

  // Use the AI SDK to stream the response
  const { textStream } = await streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    prompt: prompt,
  })

  // Return the streaming response
  return new StreamingTextResponse(textStream)
}
