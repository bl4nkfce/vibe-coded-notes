import { NextResponse } from 'next/server';
import { type NoteColor } from '@/lib/colors';

type NoteType = 'text' | 'todo' | 'link' | 'image';

interface Note {
  id: string;
  type: NoteType;
  content: string;
  createdAt: string;
  metadata?: {
    title?: string;
    url?: string;
    imageUrl?: string;
    items?: string[];
    color?: NoteColor;
  };
}

// Simple in-memory store for notes
const notes: Note[] = [];

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  try {
    const { type, content, metadata } = await request.json();

    if (!type || !content) {
      return NextResponse.json(
        { error: 'Type and content are required' },
        { status: 400 }
      );
    }

    const newNote: Note = {
      id: Date.now().toString(),
      type,
      content,
      createdAt: new Date().toISOString(),
      metadata: {
        ...metadata,
        // Ensure we have a valid color
        color: metadata?.color || '#8B5CF6', // Default to purple
      },
    };

    notes.push(newNote);
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
