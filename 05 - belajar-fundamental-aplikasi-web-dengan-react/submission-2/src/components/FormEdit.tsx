import { useState, type FormEventHandler } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Archive, FileText, Trash2 } from "react-feather";
import { archiveNote, deleteNote, unarchiveNote } from "../utils/localData";
import ButtonAction from "./ButtonAction";

const MAX_LENGTH_TITLE = 50;

type FormEditProps = {
  noteId: string;
  title: string;
  body: string;
  archived: boolean;
  editNote: CallableFunction;
};

const FormEdit = ({
  noteId,
  title: defaultTitle,
  body: defaultBody,
  archived,
  editNote,
}: FormEditProps) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(defaultTitle);
  const [body, setBody] = useState(defaultBody);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    editNote({ id: noteId, title, body });

    toast.success("Successfuly edit a note");
    setTitle("");
    setBody("");

    navigate("/");
  };

  const onChangeTitle = (value: string) => {
    if (value.length > MAX_LENGTH_TITLE) return;

    setTitle(value);
  };

  const handleDelete = (noteId: string) => {
    deleteNote(noteId);
    navigate("/");
  };

  const handleArchive = (noteId: string) => {
    archiveNote(noteId);
    navigate("/archives");
  };

  const handleUnarchive = (noteId: string) => {
    unarchiveNote(noteId);
    navigate("/");
  };

  return (
    <section className="rounded-2xl shadow bg-secondary px-9 py-10">
      <section className="flex justify-between mb-2">
        <h1 className="font-semibold text-3xl text-primary">Edit a Note</h1>
        <div className="flex gap-2">
          {archived ? (
            <ButtonAction
              title="Activate"
              onClick={() => handleUnarchive(noteId)}
            >
              <FileText size={24} />
            </ButtonAction>
          ) : (
            <ButtonAction
              title="Archived"
              onClick={() => handleArchive(noteId)}
            >
              <Archive size={24} />
            </ButtonAction>
          )}
          <ButtonAction title="Delete" onClick={() => handleDelete(noteId)}>
            <Trash2 size={24} />
          </ButtonAction>
        </div>
      </section>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mb-4">
          <input
            name="title"
            id="title"
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder="Title"
            className="text-2xl text-primary border-none outline-none w-full"
          />
          <p className="text-xs text-primary">
            Remaining Characters: {MAX_LENGTH_TITLE - title.length}
          </p>
        </div>
        <textarea
          name="body"
          id="body"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Take a note..."
          className="text-xl text-primary border-none outline-none"
        ></textarea>
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="border-none outline-none bg-primary rounded-md text-secondary px-8 py-2"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormEdit;
