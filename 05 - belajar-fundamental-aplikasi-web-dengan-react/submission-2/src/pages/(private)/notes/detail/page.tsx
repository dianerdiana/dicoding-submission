import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormEdit from "../../../../components/FormEdit";
import { getNote } from "../../../../services/note.service";
import type { NoteItemType } from "../../../../types/noteItem";
import NoteEditSkeleton from "../../../../components/skeleton/NoteEditSkeleton";
import { useTranslate } from "../../../../utils/hooks/useTranslate";
import { getHomeRouteForLoggedInUser } from "../../../../utils";

const NoteDetailPage = () => {
  const { noteId } = useParams();
  const t = useTranslate();

  const [note, setNote] = useState<NoteItemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await getNote(noteId || "");

        if (response.error) {
          throw new Error(t("note_not_found"));
        }

        setNote(response.data);
      } catch (error) {
        console.error(`Error: ${error}`);
        setError(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId]);

  if (loading) return <NoteEditSkeleton />;

  if (error)
    return (
      <div className="text-center space-y-6 h-[80vh] flex items-center flex-col justify-center dark:text-gray-100">
        <p>
          ID Note: <strong>{noteId}</strong> {t("is_not_found")}.
        </p>

        <Link
          to={getHomeRouteForLoggedInUser()}
          className="px-8 py-2 border-none rounded-md outline-none bg-primary text-secondary"
        >
          {t("back_to_list")}
        </Link>
      </div>
    );

  if (note) {
    return (
      <FormEdit
        noteId={note.id}
        body={note.body}
        title={note.title}
        archived={note.archived}
      />
    );
  }

  return null;
};

export default NoteDetailPage;
