"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectCard from "@/components/project-card"
import type { Project } from "@/lib/types"

interface ProjectsProps {
  projects: {
    fullStack: Project[]
    frontend: Project[]
  }
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState("fullStack")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section id="projects" className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A showcase of my recent work and projects
            </p>
          </div>
        </motion.div>

        <div className="mt-10">
          <Tabs defaultValue="fullStack" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="fullStack">Full Stack</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
            </TabsList>

            <TabsContent value="fullStack" className="mt-6">
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate={activeTab === "fullStack" ? "show" : "hidden"}
                viewport={{ once: true }}
              >
                {projects.fullStack.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="frontend" className="mt-6">
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate={activeTab === "frontend" ? "show" : "hidden"}
                viewport={{ once: true }}
              >
                {projects.frontend.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
