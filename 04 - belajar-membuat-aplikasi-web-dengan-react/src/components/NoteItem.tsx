import { Archive, FileText, Trash2 } from "react-feather";
import type { NoteItemType } from "../types/noteItem";
import { timeAgo } from "../utils/timeAgo";

type NoteItemProps = NoteItemType & {
  deleteNote: CallableFunction;
  updateArchived: CallableFunction;
};

export const NoteItem = ({
  id,
  title,
  body,
  archived,
  createdAt,
  deleteNote,
  updateArchived,
}: NoteItemProps) => {
  return (
    <li key={id} className="rounded-2xl bg-secondary w-[32%] p-5 shadow">
      <section className="flex justify-between mb-4">
        <h3 className="text-primary font-semibold text-2xl flex-1">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => updateArchived(id)}
            className="border-none outline-none cursor-pointer"
          >
            {archived ? <FileText size={16} /> : <Archive size={16} />}
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
      <p className="text-sm">{timeAgo(createdAt)}</p>
    </li>
  );
};
