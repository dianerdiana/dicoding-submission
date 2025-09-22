import { useState } from "react";
import { FormAdd } from "./components/FormAdd";
import { FormSearch } from "./components/FormSearch";
import { Header } from "./components/Header";
import { NoteList } from "./components/NoteList";
import type { NoteItemType } from "./types/noteItem";
import toast from "react-hot-toast";

function App() {
  const [notes, setNotes] = useState<NoteItemType[] | []>([]);

  const generateUniqueId = (): string => {
    return `${Math.random().toString(36).slice(2, 9)}`;
  };

  const addNote = ({ title, body }: { title: string; body: string }) => {
    const noteId = generateUniqueId();
    const createdAt = new Date().toISOString();

    setNotes((prevState) => [
      ...prevState,
      {
        id: noteId,
        title,
        body,
        archived: false,
        createdAt,
      },
    ]);
  };

  const deleteNote = (noteId: string) => {
    const deletedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(deletedNotes);

    toast.success("Note Deleted");
  };

  return (
    <main className="min-h-screen max-w-5xl mx-auto py-4 font-montserrat ">
      <Header />
      <FormAdd addNote={addNote} />
      <FormSearch />
      <NoteList notes={notes} deleteNote={deleteNote} />
      <footer>
        <p>Created By Dian Erdiana</p>
      </footer>
    </main>
  );
}

export default App;
