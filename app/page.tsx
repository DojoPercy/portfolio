import { Suspense } from "react"
import Hero from "@/components/sections/hero"
import TechStack from "@/components/sections/tech-stack"
import Projects from "@/components/sections/projects"
import About from "@/components/sections/about"
import Contact from "@/components/sections/contact"
import { getProjects, getAboutInfo, getTechStack } from "@/lib/data"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Project } from "@/lib/types"

export default async function Home() {
  const [projects, aboutInfo, techStack] = await Promise.all([getProjects(), getAboutInfo(), getTechStack()])

  return (
    <main className="min-h-screen">
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <TechStack techStack={techStack} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Projects projects={projects as { fullStack: Project[]; frontend: Project[] }} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <About aboutInfo={aboutInfo} />
      </Suspense>
      <Contact />
    </main>
  )
}