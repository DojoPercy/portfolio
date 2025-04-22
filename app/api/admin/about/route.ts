import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const aboutInfo = await prisma.aboutInfo.findFirst()

    return NextResponse.json(aboutInfo || {})
  } catch (error) {
    console.error("Error fetching about info:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const aboutInfo = await prisma.aboutInfo.findFirst()

    if (aboutInfo) {
      const updated = await prisma.aboutInfo.update({
        where: { id: aboutInfo.id },
        data,
      })
      return NextResponse.json(updated)
    } else {
      const created = await prisma.aboutInfo.create({
        data,
      })
      return NextResponse.json(created)
    }
  } catch (error) {
    console.error("Error updating about info:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
