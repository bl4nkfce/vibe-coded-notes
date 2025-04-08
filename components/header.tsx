import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
          NeoNotes
        </h1>
        <div className="ml-2 px-2 py-1 text-xs rounded-md bg-purple-900/50 border border-purple-500/30 text-purple-300">
          v1.0
        </div>
      </div>
      <div className="relative w-full sm:w-64 md:w-80">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
        <Input
          placeholder="Search notes..."
          className="pl-8 bg-gray-900/60 border-purple-500/30 focus:border-cyan-400 text-gray-200 placeholder:text-gray-500"
        />
      </div>
    </header>
  )
}
