export interface TechStackItem {
  id: string
  name: string
  description: string
  tags: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  details: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  type: "fullStack" | "frontend"
}

export interface AboutInfo {
  bio: string
  philosophy: string
  tools: string[]
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
