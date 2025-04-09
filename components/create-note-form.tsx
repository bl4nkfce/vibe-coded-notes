'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ListTodo, FileText, LinkIcon, ImageIcon, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CreateNoteForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteType, setNoteType] = useState('text');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: noteType,
          content,
          metadata: {
            title: content.split('\n')[0] || 'Untitled Note',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      // Reset form and refresh the page to show new note
      setContent('');
      setIsExpanded(false);
      router.refresh();
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mb-8 max-w-2xl">
      <div
        className="relative rounded-lg border border-purple-500/30 bg-gray-900/60 p-4 shadow-lg backdrop-blur-sm transition-all hover:shadow-purple-500/10"
        style={{
          boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)',
        }}
      >
        {!isExpanded ? (
          <div
            className="flex cursor-text items-center gap-2 text-gray-400"
            onClick={() => setIsExpanded(true)}
          >
            <Plus className="h-5 w-5 text-purple-400" />
            <span>Create a new note...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Take a note..."
              className="resize-none border-none bg-transparent p-0 text-gray-200 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select defaultValue="text" onValueChange={setNoteType}>
                  <SelectTrigger className="w-[140px] border-purple-500/30 bg-gray-800">
                    <SelectValue placeholder="Note type" />
                  </SelectTrigger>
                  <SelectContent className="border-purple-500/30 bg-gray-800">
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
                  disabled={isSubmitting}
                  className="border-none bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Adding...' : 'Add'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
