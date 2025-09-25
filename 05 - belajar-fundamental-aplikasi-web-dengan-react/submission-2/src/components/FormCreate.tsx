import { useState, type FormEventHandler } from "react";
import { useNavigate } from "react-router";
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
    <section className="rounded-2xl shadow bg-secondary px-9 py-10">
      <h1 className="font-semibold text-3xl text-primary mb-2">
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
            className="text-2xl text-primary border-none outline-none w-full"
          />
          <p className="text-xs text-primary">
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
          className="text-xl text-primary border-none outline-none"
        ></textarea>
        <div className="flex justify-end mt-5">
          <button
            disabled={loading}
            type="submit"
            className="px-8 py-2 outline-none bg-primary text-white rounded-sm cursor-pointer mt-4 hover:bg-blue-900"
          >
            {t("save")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormCreate;
