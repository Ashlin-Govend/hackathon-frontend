import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const lastUserMessage = messages?.filter((m: any) => m.role === "user").pop()?.content

  if (!lastUserMessage) {
    return NextResponse.json(
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "No user message provided.",
      },
      { status: 400 }
    )
  }

  try {
    const flaskUrl = "http://localhost:5000/askcopilot" // Your Flask route

    const response = await fetch(flaskUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: lastUserMessage }),
    })

    if (!response.ok) {
      throw new Error(`Flask API returned ${response.status}`)
    }

    const data = await response.json()
    console.log

    return NextResponse.json({
      id: Date.now().toString(),
      role: "assistant",
      content: data.response?.toString() || "No response from assistant.",
    })
  } catch (error: any) {
    console.error("❌ Error contacting Flask API:", error.message)
    return NextResponse.json(
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, something went wrong while generating the response.",
      },
      { status: 500 }
    )
  }
}
