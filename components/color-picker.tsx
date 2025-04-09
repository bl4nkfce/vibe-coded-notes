'use client';

import { Palette } from 'lucide-react';
import { NOTE_COLORS, type NoteColor } from '@/lib/colors';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ColorPickerProps {
  value: NoteColor;
  onChange: (value: NoteColor) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[140px] border-purple-500/30 bg-gray-800">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <SelectValue placeholder="Color" />
        </div>
      </SelectTrigger>
      <SelectContent className="border-purple-500/30 bg-gray-800">
        {NOTE_COLORS.map((color) => (
          <SelectItem key={color.value} value={color.value}>
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${color.bg}`} />
              <span>{color.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
