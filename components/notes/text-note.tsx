'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { MoreHorizontal, Trash2, Edit, Pin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { type NoteColor } from '@/lib/colors';
import { EditNoteForm } from '@/components/edit-note-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TextNoteProps {
  note: {
    id: string;
    type: string;
    title: string;
    content: string;
    color: NoteColor;
    createdAt: string;
  };
  onDelete: () => void;
}

export function TextNote({ note, onDelete }: TextNoteProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Card
        className="backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
        style={{
          background: `linear-gradient(to bottom right, ${note.color}20, ${note.color}10)`,
          borderColor: `${note.color}30`,
          boxShadow: `0 0 20px ${note.color}20`,
        }}
      >
        <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
          <h3 className="text-lg font-bold text-white">{note.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-white"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-purple-500/30 bg-gray-800"
            >
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                <Pin className="h-4 w-4" />
                <span>Pin</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-2 text-red-400 hover:text-red-300"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="whitespace-pre-wrap text-gray-300">{note.content}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-xs text-gray-500">{formatDate()}</p>
        </CardFooter>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="border-purple-500/30 bg-gray-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Note</DialogTitle>
          </DialogHeader>
          <EditNoteForm
            note={{
              id: note.id,
              type: note.type,
              content: note.content,
              metadata: {
                color: note.color,
              },
            }}
            onClose={() => setIsEditing(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
