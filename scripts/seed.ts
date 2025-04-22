const { PrismaClient } = require("@prisma/client")
const { hash } = require("bcryptjs")

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})


async function main() {
  try {
    // Create admin user
    const password = await hash("admin123", 10)
    const admin = await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        email: "admin@example.com",
        name: "Admin",
        password,
        role: "admin",
      },
    })
    console.log("Admin user created:", admin.email)

    // Create sample tech stack items
    const fullStackTech = [
      {
        name: "Node.js",
        description: "JavaScript runtime for server-side applications",
        tags: ["Backend", "JavaScript", "Runtime"],
        category: "fullStack",
      },
      {
        name: "Express.js",
        description: "Web application framework for Node.js",
        tags: ["Backend", "Framework", "API"],
        category: "fullStack",
      },
      {
        name: "PostgreSQL",
        description: "Powerful, open source object-relational database",
        tags: ["Database", "SQL", "Relational"],
        category: "fullStack",
      },
      {
        name: "Prisma",
        description: "Next-generation ORM for Node.js and TypeScript",
        tags: ["ORM", "Database", "TypeScript"],
        category: "fullStack",
      },
    ]

    const frontendTech = [
      {
        name: "React",
        description: "JavaScript library for building user interfaces",
        tags: ["Frontend", "UI", "Component-based"],
        category: "frontend",
      },
      {
        name: "Next.js",
        description: "React framework for production",
        tags: ["Frontend", "SSR", "Framework"],
        category: "frontend",
      },
      {
        name: "TailwindCSS",
        description: "Utility-first CSS framework",
        tags: ["CSS", "Styling", "Responsive"],
        category: "frontend",
      },
      {
        name: "TypeScript",
        description: "Typed superset of JavaScript",
        tags: ["Language", "Static Typing", "JavaScript"],
        category: "frontend",
      },
    ]

    // Insert tech stack items
    for (const tech of [...fullStackTech, ...frontendTech]) {
      await prisma.techStack.upsert({
        where: {
          name_category: {
            name: tech.name,
            category: tech.category,
          },
        },
        update: tech,
        create: tech,
      })
    }
    console.log("Tech stack items created")

    // Create sample projects
    const projects = [
      {
        title: "E-Commerce Platform",
        description: "Full-featured e-commerce platform with payment integration",
        details:
          "Built with Next.js, PostgreSQL, and Stripe for payments. Features include user authentication, product management, cart functionality, and order processing.",
        image: "/placeholder.svg?height=400&width=600",
        technologies: ["Next.js", "PostgreSQL", "Express", "Node.js", "Stripe"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        type: "fullStack",
      },
      {
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
    ]

    // Insert projects
    for (const project of projects) {
      await prisma.project.upsert({
        where: {
          title_type: {
            title: project.title,
            type: project.type,
          },
        },
        update: project,
        create: project,
      })
    }
    console.log("Sample projects created")

    // Create about info
    const aboutInfoCount = await prisma.aboutInfo.count()

    if (aboutInfoCount === 0) {
      await prisma.aboutInfo.create({
        data: {
          bio: "I'm a passionate Full Stack Developer with over 5 years of experience building web applications. I started my journey as a frontend developer and gradually expanded my skills to include backend technologies.",
          philosophy:
            "I believe in writing clean, maintainable code that solves real problems. My approach focuses on balancing technical excellence with practical solutions.",
          tools: ["VS Code", "Figma", "Git", "Docker", "Postman", "Chrome DevTools"],
        },
      })
      console.log("About info created")
    } else {
      console.log("About info already exists, skipping creation")
    }

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
