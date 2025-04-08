"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ListTodo, FileText, LinkIcon, ImageIcon, Plus } from "lucide-react"

export function CreateNoteForm() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [noteType, setNoteType] = useState("text")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle note creation logic here
    setIsExpanded(false)
  }

  return (
    <div className="mb-8 max-w-2xl mx-auto">
      <div
        className="relative p-4 rounded-lg border border-purple-500/30 bg-gray-900/60 backdrop-blur-sm shadow-lg hover:shadow-purple-500/10 transition-all"
        style={{
          boxShadow: "0 0 10px rgba(168, 85, 247, 0.2)",
        }}
      >
        {!isExpanded ? (
          <div className="flex items-center gap-2 text-gray-400 cursor-text" onClick={() => setIsExpanded(true)}>
            <Plus className="h-5 w-5 text-purple-400" />
            <span>Create a new note...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Take a note..."
              className="resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-gray-200 placeholder:text-gray-500"
              rows={3}
              autoFocus
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select defaultValue="text" onValueChange={setNoteType}>
                  <SelectTrigger className="w-[140px] bg-gray-800 border-purple-500/30">
                    <SelectValue placeholder="Note type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-purple-500/30">
                    <SelectItem value="text">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-cyan-400" />
                        <span>Text</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="todo">
                      <div className="flex items-center gap-2">
                        <ListTodo className="h-4 w-4 text-pink-400" />
                        <span>Todo List</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="link">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-purple-400" />
                        <span>Link</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="image">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-blue-400" />
                        <span>Image</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-none"
                >
                  Add
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
