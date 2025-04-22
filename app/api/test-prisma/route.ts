import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Simple query to test if Prisma is working
    const count = await prisma.user.count()

    return NextResponse.json({
      message: "Prisma is working correctly",
      userCount: count,
    })
  } catch (error) {
    console.error("Prisma test error:", error)
    return NextResponse.json(
      {
        error: "Prisma connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
