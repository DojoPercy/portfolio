"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import type { ContactFormData } from "@/lib/types"

export async function sendContactForm(data: ContactFormData) {
  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending contact form:", error)
    throw new Error("Failed to send message")
  }
}

export async function createProject(data: any) {
  try {
    await prisma.project.create({
      data,
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error creating project:", error)
    throw new Error("Failed to create project")
  }
}

export async function updateProject(id: string, data: any) {
  try {
    await prisma.project.update({
      where: { id },
      data,
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating project:", error)
    throw new Error("Failed to update project")
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error deleting project:", error)
    throw new Error("Failed to delete project")
  }
}

export async function updateAboutInfo(data: any) {
  try {
    // Get the first about info or create if it doesn't exist
    const aboutInfo = await prisma.aboutInfo.findFirst()

    if (aboutInfo) {
      await prisma.aboutInfo.update({
        where: { id: aboutInfo.id },
        data,
      })
    } else {
      await prisma.aboutInfo.create({
        data,
      })
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating about info:", error)
    throw new Error("Failed to update about info")
  }
}

export async function updateTechStack(data: any) {
  try {
    // Implementation depends on how tech stack is stored
    // This is a simplified example

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating tech stack:", error)
    throw new Error("Failed to update tech stack")
  }
}
