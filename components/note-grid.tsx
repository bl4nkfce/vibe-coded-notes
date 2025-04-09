'use client';

import { useState, useEffect } from 'react';
import { match } from 'ts-pattern';
import { TextNote } from '@/components/notes/text-note';
import { TodoNote } from '@/components/notes/todo-note';
import { LinkNote } from '@/components/notes/link-note';
import { ImageNote } from '@/components/notes/image-note';

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

type BaseNote = {
  id: string;
  type: string;
  title: string;
  color: string;
  createdAt: string;
};

type TextNoteType = BaseNote & {
  type: 'text';
  content: string;
};

type TodoNoteType = BaseNote & {
  type: 'todo';
  items: TodoItem[];
};

type LinkNoteType = BaseNote & {
  type: 'link';
  url: string;
  description: string;
};

type ImageNoteType = BaseNote & {
  type: 'image';
  imageUrl: string;
  description: string;
};

type Note = TextNoteType | TodoNoteType | LinkNoteType | ImageNoteType;

type ApiNote = {
  id: string;
  type: 'text' | 'todo' | 'link' | 'image';
  content: string;
  createdAt: string;
  metadata?: {
    title?: string;
    url?: string;
    imageUrl?: string;
    items?: string[];
  };
};

export function NoteGrid() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = (await response.json()) as ApiNote[];

      // Transform API data to match our note types using ts-pattern
      const transformedNotes = data
        .map((note) => {
          const baseNote = {
            id: note.id,
            type: note.type,
            title: note.metadata?.title || 'Untitled Note',
            color: getRandomColor(),
            createdAt: note.createdAt,
          };

          return match(note.type)
            .with('text', () => ({
              ...baseNote,
              type: 'text' as const,
              content: note.content,
            }))
            .with('todo', () => ({
              ...baseNote,
              type: 'todo' as const,
              items:
                note.metadata?.items?.map((item, index) => ({
                  id: `t${index}`,
                  text: item,
                  completed: false,
                })) || [],
            }))
            .with('link', () => ({
              ...baseNote,
              type: 'link' as const,
              url: note.metadata?.url || '',
              description: note.content,
            }))
            .with('image', () => ({
              ...baseNote,
              type: 'image' as const,
              imageUrl: note.metadata?.imageUrl || '',
              description: note.content,
            }))
            .otherwise(() => null);
        })
        .filter(Boolean) as Note[];

      setNotes(transformedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    // TODO: Implement delete functionality in API
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleToggleTodo = async (noteId: string, todoId: string) => {
    // TODO: Implement todo toggle functionality in API
    setNotes(
      notes.map((note) => {
        if (note.id === noteId && note.type === 'todo') {
          return {
            ...note,
            items: note.items.map((item) =>
              item.id === todoId
                ? { ...item, completed: !item.completed }
                : item
            ),
          };
        }
        return note;
      })
    );
  };

  if (isLoading) {
    return <div className="text-center text-gray-400">Loading notes...</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No notes yet. Create your first note!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notes.map((note) =>
        match(note)
          .with({ type: 'text' }, (note) => (
            <TextNote
              key={note.id}
              note={note}
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))
          .with({ type: 'todo' }, (note) => (
            <TodoNote
              key={note.id}
              note={note}
              onDelete={() => handleDeleteNote(note.id)}
              onToggle={(todoId) => handleToggleTodo(note.id, todoId)}
            />
          ))
          .with({ type: 'link' }, (note) => (
            <LinkNote
              key={note.id}
              note={note}
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))
          .with({ type: 'image' }, (note) => (
            <ImageNote
              key={note.id}
              note={note}
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))
          .otherwise(() => null)
      )}
    </div>
  );
}

function getRandomColor() {
  const colors = ['purple', 'pink', 'cyan', 'blue'];
  return colors[Math.floor(Math.random() * colors.length)];
}
