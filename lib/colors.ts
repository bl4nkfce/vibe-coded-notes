export const NOTE_COLORS = [
  {
    name: 'Purple',
    value: '#8B5CF6',
    bg: 'bg-purple-500',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
  },
  {
    name: 'Pink',
    value: '#EC4899',
    bg: 'bg-pink-500',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
  },
  {
    name: 'Cyan',
    value: '#06B6D4',
    bg: 'bg-cyan-500',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
  },
  {
    name: 'Blue',
    value: '#3B82F6',
    bg: 'bg-blue-500',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
  },
  {
    name: 'Indigo',
    value: '#6366F1',
    bg: 'bg-indigo-500',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400',
  },
  {
    name: 'Teal',
    value: '#14B8A6',
    bg: 'bg-teal-500',
    border: 'border-teal-500/30',
    text: 'text-teal-400',
  },
] as const;

export type NoteColor = (typeof NOTE_COLORS)[number]['value'];
