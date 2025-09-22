import { useState, type FormEventHandler } from "react";
import toast from "react-hot-toast";

export const FormAdd = ({ addNote }: { addNote: CallableFunction }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addNote({ title, body });

    toast.success("Successfuly add a new note");
  };

  return (
    <section className="rounded-2xl shadow bg-secondary px-9 py-10">
      <h1 className="font-semibold text-3xl text-primary mb-2">Add a Note</h1>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <input
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="text-2xl mb-4 text-primary border-none outline-none"
        />
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
