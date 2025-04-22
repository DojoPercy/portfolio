"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-20 md:py-28 lg:py-36">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Full Stack & Frontend Developer
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Building seamless user experiences & scalable backend solutions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <Link href="#projects">View Projects</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="mx-auto lg:order-last"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="https://i.imgur.com/w30qnhw.png"
              alt="Developer Portrait"
              width={500}
              height={500}
              className="aspect-square rounded-full object-cover border-4 border-primary/20"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
