import { useState, type FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../services/note.service";
import toast from "react-hot-toast";
import { useTranslate } from "../utils/hooks/useTranslate";

const MAX_LENGTH_TITLE = 50;

const FormCreate = () => {
  const navigate = useNavigate();
  const t = useTranslate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addNote({ title, body });

      if (response.error) {
        throw new Error("Failed!");
      }

      toast.success(t("success_create_note"));
      setTitle("");
      setBody("");

      navigate("/");
    } catch (error) {
      console.error(`Error: ${error}`);
      toast.error(t("failed"));
    } finally {
      setLoading(false);
    }
  };

  const onChangeTitle = (value: string) => {
    if (value.length > MAX_LENGTH_TITLE) return;

    setTitle(value);
  };

  return (
    <section className="py-10 shadow rounded-2xl bg-secondary px-9 dark:bg-gray-800">
      <h1 className="mb-2 text-3xl font-semibold text-primary dark:text-gray-100">
        {t("add_a_note")}
      </h1>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mb-4">
          <input
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
          name="body"
          id="body"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={`${t("take_a_note")}...`}
          className="text-xl border-none outline-none text-primary dark:text-gray-100"
        ></textarea>
        <div className="flex justify-end mt-5">
          <button
            disabled={loading}
            type="submit"
            className="px-8 py-2 mt-4 text-white rounded-sm outline-none cursor-pointer bg-primary hover:bg-blue-900 dark:bg-blue-800 dark:hover:bg-primary"
          >
            {t("save")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormCreate;
