"use client"

import { useState } from "react"
import { TextNote } from "@/components/notes/text-note"
import { TodoNote } from "@/components/notes/todo-note"
import { LinkNote } from "@/components/notes/link-note"
import { ImageNote } from "@/components/notes/image-note"

// Sample data for demonstration
const initialNotes = [
  {
    id: "1",
    type: "text",
    title: "Cyberpunk 2077",
    content: "Remember to finish the main storyline and explore Night City's hidden areas.",
    color: "purple",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "todo",
    title: "Augmentations Shopping List",
    items: [
      { id: "t1", text: "Neural processor", completed: true },
      { id: "t2", text: "Optical enhancements", completed: false },
      { id: "t3", text: "Subdermal armor", completed: false },
      { id: "t4", text: "Reinforced tendons", completed: false },
    ],
    color: "pink",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    type: "link",
    title: "Netrunner Forums",
    url: "https://example.com/netrunner",
    description: "Check out the latest hacking techniques and security bypasses.",
    color: "cyan",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    type: "image",
    title: "Night City Skyline",
    imageUrl: "/placeholder.svg?height=300&width=400",
    description: "View from the Arasaka Tower at night.",
    color: "blue",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    type: "text",
    title: "Synthetic Dreams",
    content:
      "The line between reality and digital consciousness grows thinner every day. Are memories just data waiting to be corrupted?",
    color: "purple",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    type: "todo",
    title: "Heist Preparation",
    items: [
      { id: "t5", text: "Gather intel", completed: true },
      { id: "t6", text: "Secure weapons", completed: true },
      { id: "t7", text: "Plan escape route", completed: false },
      { id: "t8", text: "Hire backup", completed: false },
    ],
    color: "pink",
    createdAt: new Date().toISOString(),
  },
]

export function NoteGrid() {
  const [notes, setNotes] = useState(initialNotes)

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const handleToggleTodo = (noteId: string, todoId: string) => {
    setNotes(
      notes.map((note) => {
        if (note.id === noteId && note.type === "todo") {
          return {
            ...note,
            items: note.items.map((item) => (item.id === todoId ? { ...item, completed: !item.completed } : item)),
          }
        }
        return note
      }),
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {notes.map((note) => {
        switch (note.type) {
          case "text":
            return <TextNote key={note.id} note={note} onDelete={() => handleDeleteNote(note.id)} />
          case "todo":
            return (
              <TodoNote
                key={note.id}
                note={note}
                onDelete={() => handleDeleteNote(note.id)}
                onToggle={(todoId) => handleToggleTodo(note.id, todoId)}
              />
            )
          case "link":
            return <LinkNote key={note.id} note={note} onDelete={() => handleDeleteNote(note.id)} />
          case "image":
            return <ImageNote key={note.id} note={note} onDelete={() => handleDeleteNote(note.id)} />
          default:
            return null
        }
      })}
    </div>
  )
}
