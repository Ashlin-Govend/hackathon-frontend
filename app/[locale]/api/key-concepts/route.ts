import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { topic } = await req.json()

  try {
    const response = await fetch("http://localhost:5000/key-concepts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Key Concepts Proxy Error:", error.message)
    return NextResponse.json({ error: "Failed to fetch key concepts" }, { status: 500 })
  }
}
