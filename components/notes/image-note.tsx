"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MoreHorizontal, Trash2, Edit, Pin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface ImageNoteProps {
  note: {
    id: string
    type: string
    title: string
    imageUrl: string
    description: string
    color: string
    createdAt: string
  }
  onDelete: () => void
}

export function ImageNote({ note, onDelete }: ImageNoteProps) {
  const colorMap = {
    purple: "from-purple-500/20 to-purple-900/20 border-purple-500/30",
    pink: "from-pink-500/20 to-pink-900/20 border-pink-500/30",
    cyan: "from-cyan-500/20 to-cyan-900/20 border-cyan-500/30",
    blue: "from-blue-500/20 to-blue-900/20 border-blue-500/30",
  }

  const glowMap = {
    purple: "shadow-purple-500/20",
    pink: "shadow-pink-500/20",
    cyan: "shadow-cyan-500/20",
    blue: "shadow-blue-500/20",
  }

  return (
    <Card
      className={`bg-gradient-to-br ${colorMap[note.color as keyof typeof colorMap]} backdrop-blur-sm border ${glowMap[note.color as keyof typeof glowMap]} hover:shadow-lg transition-all duration-300`}
    >
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <h3 className="font-bold text-lg text-white">{note.title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 border-purple-500/30">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Pin className="h-4 w-4" />
              <span>Pin</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-400 hover:text-red-300 cursor-pointer"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-2">
        <div className="relative w-full h-48 overflow-hidden rounded-md">
          <Image src={note.imageUrl || "/placeholder.svg"} alt={note.title} fill className="object-cover" />
        </div>
        <p className="text-gray-300">{note.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  )
}
