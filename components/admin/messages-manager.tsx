"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: string
}

export default function MessagesManager() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch("/api/admin/messages")
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.error("Error fetching messages:", error)
        toast({
          title: "Error",
          description: "Failed to load messages",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [toast])

  async function handleMarkAsRead(id: string) {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      })

      if (!response.ok) {
        throw new Error("Failed to mark message as read")
      }

      // Update local state
      setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)))

      toast({
        title: "Success",
        description: "Message marked as read",
      })
    } catch (error) {
      console.error("Error marking message as read:", error)
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive",
      })
    }
  }

  async function handleDeleteMessage(id: string) {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await fetch(`/api/admin/messages/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete message")
        }

        // Update local state
        setMessages((prev) => prev.filter((msg) => msg.id !== id))

        toast({
          title: "Success",
          description: "Message deleted successfully",
        })
      } catch (error) {
        console.error("Error deleting message:", error)
        toast({
          title: "Error",
          description: "Failed to delete message",
          variant: "destructive",
        })
      }
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
      <h2 className="text-xl font-bold">Contact Messages</h2>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={message.read ? "opacity-75" : ""}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{message.name}</span>
                  {!message.read && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      New
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    <strong>Email:</strong> {message.email}
                  </p>
                  <p className="text-sm">
                    <strong>Date:</strong> {new Date(message.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm">
                    <strong>Message:</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">{message.message}</p>
                  <div className="flex gap-2">
                    {!message.read && (
                      <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(message.id)}>
                        Mark as Read
                      </Button>
                    )}
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteMessage(message.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
