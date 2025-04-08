import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold cyberpunk-glow bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
          NeoNotes
        </h1>
        <div className="ml-3 px-2 py-0.5 text-xs rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300">
          v1.0
        </div>
      </div>
      <div className="relative w-full sm:w-64 md:w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
        <Input
          placeholder="Search notes..."
          className="cyberpunk-input pl-9 w-full text-white/70 placeholder:text-white/30"
        />
      </div>
    </header>
  );
}
