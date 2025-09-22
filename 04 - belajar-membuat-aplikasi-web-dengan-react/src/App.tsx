import { useState } from "react";
import { FormAdd } from "./components/FormAdd";
import { FormSearch } from "./components/FormSearch";
import { Header } from "./components/Header";
import { NoteList } from "./components/NoteList";
import type { NoteItemType } from "./types/noteItem";
import toast from "react-hot-toast";
import { Archive, FileText } from "react-feather";
import { NoteCategory } from "./components/NoteCategory";
import { Footer } from "./components/Footer";

function App() {
  const [notes, setNotes] = useState<NoteItemType[] | []>([]);
  const [searchResults, setSearchResults] = useState<NoteItemType[] | []>([]);
  const [searchText, setSearchText] = useState("");

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

  const searchNote = (str: string) => {
    const searchNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(str.toLowerCase())
    );

    setSearchText(str);
    setSearchResults(searchNotes);
  };

  const updateArchived = (noteId: string) => {
    const noteIndex = notes.findIndex((note) => note.id === noteId);

    const allNotes = [...notes];
    const isArchived = allNotes[noteIndex].archived === true;

    if (isArchived) {
      allNotes[noteIndex].archived = false;
    } else {
      allNotes[noteIndex].archived = true;
    }

    setNotes(allNotes);
  };

  const getNotes = () => {
    let allNotes: NoteItemType[] = [];

    if (searchText.length > 0 && searchResults.length > 0) {
      allNotes = searchResults;
    } else if (searchText.length > 0 && searchResults.length === 0) {
      allNotes = notes;
    } else {
      allNotes = notes;
    }

    return allNotes;
  };

  return (
    <main className="min-h-screen max-w-5xl mx-auto py-4 font-montserrat ">
      <Header />
      <FormAdd addNote={addNote} />
      <FormSearch searchNote={searchNote} searchText={searchText} />

      <NoteCategory title="Active Note" icon={FileText}>
        <NoteList
          notes={getNotes().filter((note) => note.archived === false)}
          deleteNote={deleteNote}
          updateArchived={updateArchived}
        />
      </NoteCategory>

      <NoteCategory title="Archived Note" icon={Archive}>
        <NoteList
          notes={getNotes().filter((note) => note.archived === true)}
          deleteNote={deleteNote}
          updateArchived={updateArchived}
        />
      </NoteCategory>

      <Footer />
    </main>
  );
}

export default App;
