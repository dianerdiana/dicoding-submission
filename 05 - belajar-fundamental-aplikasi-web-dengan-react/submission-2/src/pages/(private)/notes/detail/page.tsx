import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import FormEdit from "../../../../components/FormEdit";
import { Fragment } from "react/jsx-runtime";
import { getNote } from "../../../../services/note.service";
import type { NoteItemType } from "../../../../types/noteItem";

const NoteDetailPage = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState<NoteItemType | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await getNote(noteId || "");

        if (response.error) {
          throw new Error("Note not found!");
        }

        setNote(response.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchNote();
  }, [noteId]);

  return (
    <Fragment>
      {noteId && note ? (
        <FormEdit
          noteId={note.id}
          body={note.body}
          title={note.title}
          archived={note.archived}
        />
      ) : (
        <div className="text-center space-y-6 h-[80vh] flex items-center flex-col justify-center">
          <p>
            ID Note: <strong>{noteId}</strong> is not found.
          </p>

          <Link
            to={"/"}
            className="border-none outline-none bg-primary rounded-md text-secondary px-8 py-2"
          >
            Back To List
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default NoteDetailPage;
