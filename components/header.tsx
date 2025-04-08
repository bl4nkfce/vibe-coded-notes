import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function Header() {
  return (
    <header className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="flex items-center">
        <h1 className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
          NeoNotes
        </h1>
        <div className="ml-2 rounded-md border border-purple-500/30 bg-purple-900/50 px-2 py-1 text-xs text-purple-300">
          v1.0
        </div>
      </div>
      <div className="relative w-full sm:w-64 md:w-80">
        <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform text-purple-400" />
        <Input
          placeholder="Search notes..."
          className="border-purple-500/30 bg-gray-900/60 pl-8 text-gray-200 placeholder:text-gray-500 focus:border-cyan-400"
        />
      </div>
    </header>
  );
}
