"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MoreHorizontal, Trash2, Edit, Pin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface TextNoteProps {
  note: {
    id: string;
    type: string;
    title: string;
    content: string;
    color: string;
    createdAt: string;
  };
  onDelete: () => void;
}

export function TextNote({ note, onDelete }: TextNoteProps) {
  const colorMap = {
    purple: "from-purple-500/10 to-purple-900/10 border-purple-500/20",
    pink: "from-pink-500/10 to-pink-900/10 border-pink-500/20",
    cyan: "from-cyan-500/10 to-cyan-900/10 border-cyan-500/20",
    blue: "from-blue-500/10 to-blue-900/10 border-blue-500/20",
  };

  return (
    <Card
      className={`cyberpunk-card bg-gradient-to-br ${
        colorMap[note.color as keyof typeof colorMap]
      }`}
    >
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-x-4">
        <h3 className="font-medium text-lg text-white/90">{note.title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/50 hover:text-white/90 hover:bg-white/10"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-black/90 border-purple-500/20"
          >
            <DropdownMenuItem className="text-white/70 focus:text-white/90 focus:bg-white/10">
              <Pin className="h-4 w-4 mr-2" />
              <span>Pin</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white/70 focus:text-white/90 focus:bg-white/10">
              <Edit className="h-4 w-4 mr-2" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-400 focus:text-red-300 focus:bg-red-900/20"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-white/70">{note.content}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-xs text-white/50">{formatDate(note.createdAt)}</p>
      </CardFooter>
    </Card>
  );
}
