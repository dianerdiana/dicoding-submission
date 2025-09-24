import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router";

// Custom Components
import FormSearch from "../../components/FormSearch";
import NoteCategory from "../../components/NoteCategory";
import NoteList from "../../components/NoteList";
import NoteListSkeleton from "../../components/skeleton/NoteListSkeleton";

// Utils
import { FileText } from "react-feather";
import { getActiveNotes } from "../../services/note.service";
import type { NoteItemType } from "../../types/noteItem";

const AppPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState<NoteItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const searchText = searchParams.get("search") || "";

  const handleSearch = (value: string) => {
    setSearchParams(value ? { search: value } : {});
  };

  const filteredNotes = useMemo(() => {
    if (!searchText) return notes;

    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [notes, searchText]);

  useEffect(() => {
    const fetchActiveNotes = async () => {
      try {
        const response = await getActiveNotes();
        if (!response.error) {
          setNotes(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    fetchActiveNotes();
  }, []);

  return (
    <>
      <FormSearch searchText={searchText} handleSearch={handleSearch} />
      <NoteCategory icon={FileText} title="Active Notes">
        {loading ? <NoteListSkeleton /> : <NoteList notes={filteredNotes} />}
      </NoteCategory>
    </>
  );
};

export default AppPage;
