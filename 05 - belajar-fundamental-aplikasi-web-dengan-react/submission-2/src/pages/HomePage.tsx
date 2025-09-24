import { Fragment } from "react/jsx-runtime";

// Hooks
import { useSearchParams } from "react-router";

// Custom Components
import FormSearch from "../components/FormSearch";
import NoteCategory from "../components/NoteCategory";
import NoteList from "../components/NoteList";

// Utils
import { FileText } from "react-feather";
import { getActiveNotes } from "../utils/localData";

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
    <Fragment>
      <FormSearch searchText={searchText || ""} handleSearch={handleSearch} />
      <NoteCategory icon={FileText} title="Active Notes">
        <NoteList notes={notes} />
      </NoteCategory>
    </Fragment>
  );
};

export default HomePage;
