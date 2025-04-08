import { Header } from "@/components/header";
import { NoteGrid } from "@/components/note-grid";
import { CreateNoteForm } from "@/components/create-note-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-cyan-500/10" />
      <div className="relative">
        <div className="container mx-auto px-4 py-6 space-y-8">
          <Header />
          <CreateNoteForm />
          <NoteGrid />
        </div>
      </div>
    </main>
  );
}
