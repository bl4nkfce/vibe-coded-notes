'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from '@/components/color-picker';
import { NOTE_COLORS, type NoteColor } from '@/lib/colors';
import { useRouter } from 'next/navigation';

interface EditNoteFormProps {
  note: {
    id: string;
    type: string;
    content: string;
    metadata?: {
      title?: string;
      color?: NoteColor;
      imageUrl?: string;
    };
  };
  onClose: () => void;
}

export function EditNoteForm({ note, onClose }: EditNoteFormProps) {
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState<NoteColor>(
    note.metadata?.color || NOTE_COLORS[0].value
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/notes', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: note.id,
          content,
          metadata: {
            title: content.split('\n')[0] || 'Untitled Note',
            color,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      onClose();
      router.refresh();
    } catch (error) {
      console.error('Error updating note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your note content..."
        className="min-h-[200px] resize-none bg-gray-800/50 text-white placeholder:text-gray-500"
      />
      <div className="flex items-center justify-between">
        <ColorPicker value={color} onChange={setColor} />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </form>
  );
}
