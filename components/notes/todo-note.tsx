'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { MoreHorizontal, Trash2, Edit, Pin, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { type NoteColor } from '@/lib/colors';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoNoteProps {
  note: {
    id: string;
    type: string;
    title: string;
    items: TodoItem[];
    color: NoteColor;
    createdAt: string;
  };
  onDelete: () => void;
  onToggle: (todoId: string) => void;
}

export function TodoNote({ note, onDelete, onToggle }: TodoNoteProps) {
  return (
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
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
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
        <ul className="space-y-2">
          {note.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2"
              onClick={() => onToggle(item.id)}
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border ${
                  item.completed
                    ? 'border-transparent bg-green-500'
                    : 'border-gray-500'
                }`}
              >
                {item.completed && <Check className="h-3 w-3 text-white" />}
              </div>
              <span
                className={`text-gray-300 ${
                  item.completed ? 'line-through opacity-50' : ''
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-xs text-gray-500">{formatDate()}</p>
      </CardFooter>
    </Card>
  );
}
