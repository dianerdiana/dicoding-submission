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
import { useTranslate } from "../utils/hooks/useTranslate";

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
  const t = useTranslate();

  const [title, setTitle] = useState(defaultTitle);
  const [body, setBody] = useState(defaultBody);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    toast.success(t("success_edit_note"));
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
        throw new Error(t("failed"));
      }

      navigate("/app");
    } catch (error) {
      console.error(`Error: ${error}`);
      toast.error(t("failed"));
    }
  };

  const handleArchive = async (noteId: string) => {
    try {
      const response = await archiveNote(noteId);

      if (response.error) {
        throw new Error(t("failed"));
      }

      navigate("/app/archives");
    } catch (error) {
      console.error(`Error: ${error}`);
      toast.error(t("failed"));
    }
  };

  const handleUnarchive = async (noteId: string) => {
    try {
      const response = await unarchiveNote(noteId);

      if (response.error) {
        throw new Error(t("failed"));
      }

      navigate("/app");
    } catch (error) {
      console.error(`Error: ${error}`);
      toast.error(t("failed"));
    }
  };

  return (
    <section className="py-10 shadow rounded-2xl bg-secondary px-9 dark:bg-gray-800">
      <section className="flex justify-between mb-2">
        <h1 className="text-3xl font-semibold text-primary dark:text-gray-100">
          {t("edit_a_note")}
        </h1>
        <div className="flex gap-2">
          {archived ? (
            <ButtonAction
              title={t("activate")}
              onClick={() => handleUnarchive(noteId)}
            >
              <FileText size={20} className="text-secondary" />
            </ButtonAction>
          ) : (
            <ButtonAction
              title={t("archived")}
              onClick={() => handleArchive(noteId)}
            >
              <Archive size={20} className="text-secondary" />
            </ButtonAction>
          )}
          <ButtonAction
            title={t("delete")}
            onClick={() => handleDelete(noteId)}
          >
            <Trash2 size={20} className="text-secondary" />
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
            placeholder={t("title")}
            className="w-full text-2xl border-none outline-none text-primary dark:text-gray-100"
          />
          <p className="text-xs text-primary dark:text-gray-300">
            {t("remaining_characters")}: {MAX_LENGTH_TITLE - title.length}
          </p>
        </div>
        <textarea
          disabled
          name="body"
          id="body"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={`${t("take_a_note")}...`}
          className="text-xl border-none outline-none text-primary dark:text-gray-100"
        ></textarea>
      </form>
    </section>
  );
};

export default FormEdit;
