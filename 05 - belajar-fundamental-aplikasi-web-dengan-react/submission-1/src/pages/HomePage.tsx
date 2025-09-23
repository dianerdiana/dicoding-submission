// Hooks
import { useSearchParams } from "react-router";

// Custom Components
import FormSearch from "../components/FormSearch";
import Header from "../components/Header";
import NoteCategory from "../components/NoteCategory";
import NoteList from "../components/NoteList";

// Utils
import { FileText } from "react-feather";
import { archiveNote, deleteNote, getActiveNotes } from "../utils/localData";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get("search");

  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
  };

  const notes = getActiveNotes().filter((note) =>
    note.title.toLowerCase().includes((searchText || "").toLowerCase())
  );

  return (
    <main className="min-h-screen max-w-7xl mx-auto py-4 font-montserrat ">
      <Header />
      <FormSearch searchText={searchText || ""} handleSearch={handleSearch} />
      <NoteCategory icon={FileText} title="Active Notes">
        <NoteList
          notes={notes}
          deleteNote={deleteNote}
          updateArchived={archiveNote}
        />
      </NoteCategory>
    </main>
  );
};

export default HomePage;
