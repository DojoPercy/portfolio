"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectsManager from "@/components/admin/projects-manager"
import TechStackManager from "@/components/admin/tech-stack-manager"
import AboutManager from "@/components/admin/about-manager"
import MessagesManager from "@/components/admin/messages-manager"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects")

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="techStack">Tech Stack</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <ProjectsManager />
        </TabsContent>

        <TabsContent value="techStack">
          <TechStackManager />
        </TabsContent>

        <TabsContent value="about">
          <AboutManager />
        </TabsContent>

        <TabsContent value="messages">
          <MessagesManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
