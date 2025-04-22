"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { TechStackItem } from "@/lib/types"

export default function TechStackManager() {
  const { toast } = useToast()
  const [techStack, setTechStack] = useState<TechStackItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTech, setSelectedTech] = useState<TechStackItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: "",
    category: "fullStack",
  })

  useEffect(() => {
    async function fetchTechStack() {
      try {
        const response = await fetch("/api/admin/tech-stack")
        const data = await response.json()
        setTechStack(data)
      } catch (error) {
        console.error("Error fetching tech stack:", error)
        toast({
          title: "Error",
          description: "Failed to load tech stack",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTechStack()
  }, [toast])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSelectChange(value: string) {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  function handleEditTech(tech: TechStackItem) {
    setSelectedTech(tech)
    setFormData({
      name: tech.name,
      description: tech.description,
      tags: tech.tags.join(", "),
      category: tech.category,
    })
    setIsEditing(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const techDataToSubmit = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      }

      const url = isEditing && selectedTech ? `/api/admin/tech-stack/${selectedTech.id}` : "/api/admin/tech-stack"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(techDataToSubmit),
      })

      if (!response.ok) {
        throw new Error("Failed to save tech stack item")
      }

      toast({
        title: "Success",
        description: isEditing ? "Tech stack item updated successfully" : "Tech stack item created successfully",
      })

      // Reset form and state
      setFormData({
        name: "",
        description: "",
        tags: "",
        category: "fullStack",
      })
      setIsEditing(false)
      setSelectedTech(null)

      // Refresh tech stack
      const techResponse = await fetch("/api/admin/tech-stack")
      const techData = await techResponse.json()
      setTechStack(techData)
    } catch (error) {
      console.error("Error saving tech stack item:", error)
      toast({
        title: "Error",
        description: "Failed to save tech stack item",
        variant: "destructive",
      })
    }
  }

  async function handleDeleteTech(id: string) {
    if (confirm("Are you sure you want to delete this tech stack item?")) {
      try {
        const response = await fetch(`/api/admin/tech-stack/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete tech stack item")
        }

        toast({
          title: "Success",
          description: "Tech stack item deleted successfully",
        })

        // Refresh tech stack
        const techResponse = await fetch("/api/admin/tech-stack")
        const techData = await techResponse.json()
        setTechStack(techData)
      } catch (error) {
        console.error("Error deleting tech stack item:", error)
        toast({
          title: "Error",
          description: "Failed to delete tech stack item",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Tech Stack Item" : "Add New Tech Stack Item"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="category">Category</label>
                <Select value={formData.category} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fullStack">Full Stack</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tags">Tags (comma separated)</label>
              <Input id="tags" name="tags" value={formData.tags} onChange={handleInputChange} required />
            </div>

            <div className="flex gap-2">
              <Button type="submit">{isEditing ? "Update Tech Stack Item" : "Add Tech Stack Item"}</Button>

              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setSelectedTech(null)
                    setFormData({
                      name: "",
                      description: "",
                      tags: "",
                      category: "fullStack",
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
        <h2 className="text-xl font-bold">Existing Tech Stack Items</h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <Card key={tech.id}>
                <CardHeader>
                  <CardTitle>{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{tech.description}</p>
                  <p className="text-sm mb-2">
                    <strong>Category:</strong> {tech.category}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tech.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleEditTech(tech)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteTech(tech.id)}>
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
