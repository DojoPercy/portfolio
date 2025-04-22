"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import type { AboutInfo } from "@/lib/types"

export default function AboutManager() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    bio: "",
    philosophy: "",
    tools: "",
  })

  useEffect(() => {
    async function fetchAboutInfo() {
      try {
        const response = await fetch("/api/admin/about")
        const data = await response.json()
        setAboutInfo(data)
        setFormData({
          bio: data.bio || "",
          philosophy: data.philosophy || "",
          tools: data.tools ? data.tools.join(", ") : "",
        })
      } catch (error) {
        console.error("Error fetching about info:", error)
        toast({
          title: "Error",
          description: "Failed to load about information",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAboutInfo()
  }, [toast])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const aboutDataToSubmit = {
        ...formData,
        tools: formData.tools.split(",").map((tool) => tool.trim()),
      }

      const response = await fetch("/api/admin/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aboutDataToSubmit),
      })

      if (!response.ok) {
        throw new Error("Failed to update about information")
      }

      toast({
        title: "Success",
        description: "About information updated successfully",
      })

      // Refresh about info
      const aboutResponse = await fetch("/api/admin/about")
      const updatedAboutData = await aboutResponse.json()
      setAboutInfo(updatedAboutData)
    } catch (error) {
      console.error("Error updating about info:", error)
      toast({
        title: "Error",
        description: "Failed to update about information",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit About Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="bio">Bio</label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="philosophy">Development Philosophy</label>
              <Textarea
                id="philosophy"
                name="philosophy"
                value={formData.philosophy}
                onChange={handleInputChange}
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tools">Tools (comma separated)</label>
              <Input id="tools" name="tools" value={formData.tools} onChange={handleInputChange} required />
            </div>

            <Button type="submit">Update About Information</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold mb-2">Bio</h3>
              <p className="text-muted-foreground">{formData.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Development Philosophy</h3>
              <p className="text-muted-foreground">{formData.philosophy}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {formData.tools.split(",").map((tool, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                  >
                    {tool.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
