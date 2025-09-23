import { Link, useParams } from "react-router";
import FormEdit from "../../../components/FormEdit";
import { editNote, getNote } from "../../../utils/localData";
import { Fragment } from "react/jsx-runtime";

const NoteDetailPage = () => {
  const { noteId } = useParams();
  const note = getNote(noteId || "");

  return (
    <Fragment>
      {noteId && note ? (
        <FormEdit
          noteId={note.id}
          body={note.body}
          title={note.title}
          archived={note.archived}
          editNote={editNote}
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
