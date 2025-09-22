import { Archive, Trash2 } from "react-feather";
import type { NoteItemType } from "../types/noteItem";

type NoteItemProps = NoteItemType & {
  deleteNote: CallableFunction;
};

export const NoteItem = ({
  id,
  title,
  body,
  createdAt,
  deleteNote,
}: NoteItemProps) => {
  return (
    <li key={id} className="rounded-2xl bg-secondary w-[32%] p-5 shadow">
      <section className="flex justify-between mb-4">
        <h3 className="text-primary font-semibold text-2xl flex-1">{title}</h3>
        <div className="flex gap-2">
          <button className="border-none outline-none cursor-pointer">
            <Archive size={16} />
          </button>
          <button
            onClick={() => deleteNote(id)}
            className="border-none outline-none cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </section>
      <p className="mb-6">{body}</p>
      <p className="text-sm">{createdAt}</p>
    </li>
  );
};
