"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListTodo, FileText, LinkIcon, ImageIcon, Plus } from "lucide-react";

export function CreateNoteForm() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle note creation logic here
    setIsExpanded(false);
  };

  return (
    <div className="cyberpunk-card">
      {!isExpanded ? (
        <div
          className="flex items-center gap-2 p-4 text-white/50 cursor-text hover:text-white/70 transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <Plus className="h-5 w-5" />
          <span>Create a new note...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <Textarea
            placeholder="Take a note..."
            className="cyberpunk-input resize-none text-white/70 placeholder:text-white/30"
            rows={3}
            autoFocus
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="cyberpunk-input w-[140px]">
                  <SelectValue placeholder="Note type" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-purple-500/20">
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
                className="text-white/50 hover:text-white/90 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-none"
              >
                Add
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
