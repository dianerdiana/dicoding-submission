import { useState, type FormEventHandler } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Archive, FileText, Trash2 } from "react-feather";
import ButtonAction from "./ButtonAction";
import {
  archiveNote,
  deleteNote,
  unarchiveNote,
} from "../services/note.service";

const MAX_LENGTH_TITLE = 50;

type FormEditProps = {
  noteId: string;
  title: string;
  body: string;
  archived: boolean;
};

const FormEdit = ({
  noteId,
  title: defaultTitle,
  body: defaultBody,
  archived,
}: FormEditProps) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(defaultTitle);
  const [body, setBody] = useState(defaultBody);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    toast.success("Successfuly edit a note");
    setTitle("");
    setBody("");

    navigate("/");
  };

  const onChangeTitle = (value: string) => {
    if (value.length > MAX_LENGTH_TITLE) return;

    setTitle(value);
  };

  const handleDelete = async (noteId: string) => {
    try {
      const response = await deleteNote(noteId);

      if (response.error) {
        throw new Error("Failed!");
      }

      navigate("/app");
    } catch (error) {
      console.error(`Error: ${error}`);
      toast.error("Failed!");
    }
  };

  const handleArchive = async (noteId: string) => {
    try {
      const response = await archiveNote(noteId);

      if (response.error) {
        throw new Error("Failed!");
      }

      navigate("/app/archives");
    } catch (error) {
      console.error(`Error: ${error}`);
      toast.error("Failed!");
    }
  };

  const handleUnarchive = async (noteId: string) => {
    try {
      const response = await unarchiveNote(noteId);

      if (response.error) {
        throw new Error("Failed!");
      }

      navigate("/app");
    } catch (error) {
      console.error(`Error: ${error}`);
      toast.error("Failed!");
    }
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
              <FileText size={24} className="text-secondary" />
            </ButtonAction>
          ) : (
            <ButtonAction
              title="Archived"
              onClick={() => handleArchive(noteId)}
            >
              <Archive size={24} className="text-secondary" />
            </ButtonAction>
          )}
          <ButtonAction title="Delete" onClick={() => handleDelete(noteId)}>
            <Trash2 size={24} className="text-secondary" />
          </ButtonAction>
        </div>
      </section>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mb-4">
          <input
            disabled
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
          disabled
          name="body"
          id="body"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Take a note..."
          className="text-xl text-primary border-none outline-none"
        ></textarea>
      </form>
    </section>
  );
};

export default FormEdit;
