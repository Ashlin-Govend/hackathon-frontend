import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { topic } = await req.json()

  try {
    const response = await fetch("http://localhost:5000/recommended-reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Proxy error:", error.message)
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 })
  }
}
