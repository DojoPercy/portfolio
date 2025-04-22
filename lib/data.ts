import { prisma } from "@/lib/prisma"
import type { Project, AboutInfo, TechStackItem } from "@/lib/types"

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany()

    // Group projects by type
    const fullStack = projects.filter((project) => project.type === "fullStack")
    const frontend = projects.filter((project) => project.type === "frontend")

    return { fullStack, frontend }
  } catch (error) {
    console.error("Error fetching projects:", error)

    // Return fallback data for development
    return {
      fullStack: getFallbackFullStackProjects(),
      frontend: getFallbackFrontendProjects(),
    }
  }
}

export async function getAboutInfo() {
  try {
    const aboutInfo = await prisma.aboutInfo.findFirst()

    if (!aboutInfo) {
      return getFallbackAboutInfo()
    }

    return aboutInfo
  } catch (error) {
    console.error("Error fetching about info:", error)
    return getFallbackAboutInfo()
  }
}

export async function getTechStack() {
  try {
    const techStack = await prisma.techStack.findMany()

    // Group tech stack items by category
    const fullStack = techStack.filter((item) => item.category === "fullStack")
    const frontend = techStack.filter((item) => item.category === "frontend")

    return { fullStack, frontend }
  } catch (error) {
    console.error("Error fetching tech stack:", error)

    // Return fallback data for development
    return {
      fullStack: getFallbackFullStackTech(),
      frontend: getFallbackFrontendTech(),
    }
  }
}

// Fallback data for development
function getFallbackFullStackProjects(): Project[] {
  return [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "Full-featured e-commerce platform with payment integration",
      details:
        "Built with Next.js, MongoDB, and Stripe for payments. Features include user authentication, product management, cart functionality, and order processing.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "MongoDB", "Express", "Node.js", "Stripe"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      type: "fullStack",
    },
    {
      id: "2",
      title: "Task Management API",
      description: "RESTful API for task management with authentication",
      details:
        "Developed a secure API with JWT authentication, role-based access control, and comprehensive documentation using Swagger.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      type: "fullStack",
    },
    {
      id: "3",
      title: "Real-time Chat Application",
      description: "Chat platform with real-time messaging capabilities",
      details:
        "Implemented with Socket.io for real-time communication, featuring private messaging, group chats, and message persistence.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      type: "fullStack",
    },
  ]
}

function getFallbackFrontendProjects(): Project[] {
  return [
    {
      id: "4",
      title: "Dashboard UI",
      description: "Modern admin dashboard with dark mode",
      details:
        "Responsive dashboard interface with interactive charts, data tables, and customizable widgets. Includes dark/light mode toggle.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "TailwindCSS", "Recharts", "Framer Motion"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      type: "frontend",
    },
    {
      id: "5",
      title: "Interactive Landing Page",
      description: "Animated landing page with parallax effects",
      details:
        "Designed and developed a high-performance landing page with smooth animations, parallax scrolling, and optimized for all devices.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "GSAP", "TailwindCSS", "TypeScript"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      type: "frontend",
    },
    {
      id: "6",
      title: "Web Animation Showcase",
      description: "Collection of advanced CSS and JS animations",
      details:
        "Showcases various animation techniques including SVG animations, 3D transforms, and interactive user interface elements.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["HTML", "CSS", "JavaScript", "SVG", "Three.js"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      type: "frontend",
    },
  ]
}

function getFallbackAboutInfo(): AboutInfo {
  return {
    bio: "I'm a passionate Full Stack Developer with over 5 years of experience building web applications. I started my journey as a frontend developer and gradually expanded my skills to include backend technologies. I enjoy solving complex problems and creating intuitive, user-friendly experiences.",
    philosophy:
      "I believe in writing clean, maintainable code that solves real problems. My approach focuses on balancing technical excellence with practical solutions. I'm committed to continuous learning and staying updated with the latest technologies and best practices.",
    tools: ["VS Code", "Figma", "Git", "Docker", "Postman", "Chrome DevTools", "Terminal", "Notion", "GitHub"],
  }
}

function getFallbackFullStackTech(): TechStackItem[] {
  return [
    {
      id: "1",
      name: "Node.js",
      description: "JavaScript runtime for server-side applications",
      tags: ["Backend", "JavaScript", "Runtime"],
    },
    {
      id: "2",
      name: "Express.js",
      description: "Web application framework for Node.js",
      tags: ["Backend", "Framework", "API"],
    },
    {
      id: "3",
      name: "MongoDB",
      description: "NoSQL document database",
      tags: ["Database", "NoSQL", "JSON"],
    },
    {
      id: "4",
      name: "PostgreSQL",
      description: "Powerful, open source object-relational database",
      tags: ["Database", "SQL", "Relational"],
    },
    {
      id: "5",
      name: "Docker",
      description: "Platform for developing, shipping, and running applications",
      tags: ["DevOps", "Containers", "Deployment"],
    },
    {
      id: "6",
      name: "GraphQL",
      description: "Query language for APIs",
      tags: ["API", "Query", "Schema"],
    },
    {
      id: "7",
      name: "AWS",
      description: "Cloud computing services",
      tags: ["Cloud", "Hosting", "Services"],
    },
    {
      id: "8",
      name: "CI/CD",
      description: "Continuous integration and deployment",
      tags: ["DevOps", "Automation", "Testing"],
    },
  ]
}

function getFallbackFrontendTech(): TechStackItem[] {
  return [
    {
      id: "9",
      name: "React",
      description: "JavaScript library for building user interfaces",
      tags: ["Frontend", "UI", "Component-based"],
    },
    {
      id: "10",
      name: "Next.js",
      description: "React framework for production",
      tags: ["Frontend", "SSR", "Framework"],
    },
    {
      id: "11",
      name: "TailwindCSS",
      description: "Utility-first CSS framework",
      tags: ["CSS", "Styling", "Responsive"],
    },
    {
      id: "12",
      name: "TypeScript",
      description: "Typed superset of JavaScript",
      tags: ["Language", "Static Typing", "JavaScript"],
    },
    {
      id: "13",
      name: "Redux",
      description: "State management library",
      tags: ["State", "Frontend", "Predictable"],
    },
    {
      id: "14",
      name: "Framer Motion",
      description: "Animation library for React",
      tags: ["Animation", "UI", "React"],
    },
    {
      id: "15",
      name: "Styled Components",
      description: "CSS-in-JS library",
      tags: ["CSS", "Styling", "Component"],
    },
    {
      id: "16",
      name: "Zustand",
      description: "State management solution",
      tags: ["State", "Frontend", "Lightweight"],
    },
  ]
}
