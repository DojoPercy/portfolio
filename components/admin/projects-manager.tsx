"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createProject, updateProject, deleteProject } from "@/lib/actions"
import type { Project } from "@/lib/types"

export default function ProjectsManager() {
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    image: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    type: "fullStack",
  })

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/admin/projects")
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
        toast({
          title: "Error",
          description: "Failed to load projects",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [toast])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSelectChange(value: string) {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  function handleEditProject(project: Project) {
    setSelectedProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      details: project.details,
      image: project.image,
      technologies: project.technologies.join(", "),
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      type: project.type,
    })
    setIsEditing(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(",").map((tech) => tech.trim()),
      }

      if (isEditing && selectedProject) {
        await updateProject(selectedProject.id, projectData)
        toast({
          title: "Success",
          description: "Project updated successfully",
        })
      } else {
        await createProject(projectData)
        toast({
          title: "Success",
          description: "Project created successfully",
        })
      }

      // Reset form and state
      setFormData({
        title: "",
        description: "",
        details: "",
        image: "",
        technologies: "",
        githubUrl: "",
        liveUrl: "",
        type: "fullStack",
      })
      setIsEditing(false)
      setSelectedProject(null)

      // Refresh projects
      const response = await fetch("/api/admin/projects")
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Error saving project:", error)
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      })
    }
  }

  async function handleDeleteProject(id: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id)
        toast({
          title: "Success",
          description: "Project deleted successfully",
        })

        // Refresh projects
        const response = await fetch("/api/admin/projects")
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Error deleting project:", error)
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Project" : "Add New Project"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="type">Type</label>
                <Select value={formData.type} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fullStack">Full Stack</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description">Short Description</label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="details">Details</label>
              <Textarea id="details" name="details" value={formData.details} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="image">Image URL</label>
              <Input id="image" name="image" value={formData.image} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="technologies">Technologies (comma separated)</label>
              <Input
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="githubUrl">GitHub URL</label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="liveUrl">Live Demo URL</label>
                <Input id="liveUrl" name="liveUrl" value={formData.liveUrl} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{isEditing ? "Update Project" : "Add Project"}</Button>

              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setSelectedProject(null)
                    setFormData({
                      title: "",
                      description: "",
                      details: "",
                      image: "",
                      technologies: "",
                      githubUrl: "",
                      liveUrl: "",
                      type: "fullStack",
                    })
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Existing Projects</h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <p className="text-sm mb-2">
                    <strong>Type:</strong> {project.type}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
