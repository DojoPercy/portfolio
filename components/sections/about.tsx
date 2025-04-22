"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { AboutInfo } from "@/lib/types"

interface AboutProps {
  aboutInfo: AboutInfo
}

export default function About({ aboutInfo }: AboutProps) {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My journey, philosophy, and approach to development
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Background</h3>
                  <p className="text-muted-foreground">{aboutInfo.bio}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Development Philosophy</h3>
                  <p className="text-muted-foreground">{aboutInfo.philosophy}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Tools & Environment</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {aboutInfo.tools.map((tool, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="mx-auto order-first lg:order-last"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="About Me"
              width={500}
              height={600}
              className="rounded-lg object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
