import { Fragment } from "react/jsx-runtime";

// Hooks
import { useSearchParams } from "react-router";

// Custom Components
import FormSearch from "../../../components/FormSearch";
import NoteCategory from "../../../components/NoteCategory";
import NoteList from "../../../components/NoteList";

// Utils
import { Archive } from "react-feather";
import { getArchivedNotes } from "../../../utils/localData";

const ArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get("search");

  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
  };

  const notes = getArchivedNotes().filter((note) =>
    note.title.toLowerCase().includes((searchText || "").toLowerCase())
  );

  return (
    <Fragment>
      <FormSearch searchText={searchText || ""} handleSearch={handleSearch} />
      <NoteCategory icon={Archive} title="Archive Notes">
        <NoteList notes={notes} />
      </NoteCategory>
    </Fragment>
  );
};

export default ArchivePage;
