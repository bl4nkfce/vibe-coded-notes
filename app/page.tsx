import { Header } from "@/components/header"
import { NoteGrid } from "@/components/note-grid"
import { CreateNoteForm } from "@/components/create-note-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <CreateNoteForm />
        <NoteGrid />
      </div>
    </main>
  )
}
