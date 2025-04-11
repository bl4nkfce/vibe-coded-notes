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

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Note ID is required' },
        { status: 400 }
      );
    }

    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    notes.splice(noteIndex, 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, type, content, metadata } = await request.json();

    if (!id || !type || !content) {
      return NextResponse.json(
        { error: 'ID, type, and content are required for full updates' },
        { status: 400 }
      );
    }

    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    const updatedNote: Note = {
      id,
      type,
      content,
      createdAt: notes[noteIndex].createdAt, // Preserve creation date
      metadata: {
        ...metadata,
        color: metadata?.color || notes[noteIndex].metadata?.color || '#8B5CF6',
      },
    };

    notes[noteIndex] = updatedNote;
    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Note ID is required' },
        { status: 400 }
      );
    }

    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    // PATCH only updates specified fields
    const updatedNote: Note = {
      ...notes[noteIndex],
      ...(updates.type && { type: updates.type }),
      ...(updates.content && { content: updates.content }),
      metadata: {
        ...notes[noteIndex].metadata,
        ...(updates.metadata?.title && { title: updates.metadata.title }),
        ...(updates.metadata?.color && { color: updates.metadata.color }),
        ...(updates.metadata?.url && { url: updates.metadata.url }),
        ...(updates.metadata?.imageUrl && {
          imageUrl: updates.metadata.imageUrl,
        }),
        ...(updates.metadata?.items && { items: updates.metadata.items }),
      },
    };

    notes[noteIndex] = updatedNote;
    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error('Error patching note:', error);
    return NextResponse.json(
      { error: 'Failed to patch note' },
      { status: 500 }
    );
  }
}
