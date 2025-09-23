import { Link } from "react-router";
import type { NoteItemType } from "../types/noteItem";
import { showFormattedDate } from "../utils";

type NoteItemProps = NoteItemType;

const NoteItem = ({ id, title, body, createdAt }: NoteItemProps) => {
  return (
    <li
      key={id}
      className="rounded-2xl bg-secondary w-[24%] p-5 shadow flex flex-col justify-between gap-4"
    >
      <h3 className="text-primary font-semibold text-2xl">
        <Link to={`/notes/detail/${id}`}>{title}</Link>
      </h3>
      <p>{body}</p>
      <p className="text-sm justify-self-end">{showFormattedDate(createdAt)}</p>
    </li>
  );
};

export default NoteItem;
