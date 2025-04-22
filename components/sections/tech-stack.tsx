"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { TechStackItem } from "@/lib/types"

interface TechStackProps {
  techStack: {
    fullStack: TechStackItem[]
    frontend: TechStackItem[]
  }
}

export default function TechStack({ techStack }: TechStackProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="tech-stack" className="py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tech Stack</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Technologies and tools I work with
            </p>
          </div>
        </motion.div>

        <div className="mt-10">
          <Tabs defaultValue="fullStack" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="fullStack">Full Stack</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
            </TabsList>

            <TabsContent value="fullStack" className="mt-6">
              <motion.div
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {techStack.fullStack.map((tech) => (
                  <motion.div key={tech.id} variants={item}>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{tech.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tech.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="frontend" className="mt-6">
              <motion.div
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {techStack.frontend.map((tech) => (
                  <motion.div key={tech.id} variants={item}>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{tech.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tech.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
