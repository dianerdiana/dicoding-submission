import { Link } from "react-router";
import type { NoteItemType } from "../types/noteItem";
import { showFormattedDate } from "../utils";

type NoteItemProps = NoteItemType;

const NoteItem = ({ id, title, body, createdAt }: NoteItemProps) => {
  return (
    <li
      key={id}
      className="rounded-2xl bg-secondary lg:w-[24%] md:w-[48%] w-full p-5 shadow flex flex-col justify-between gap-4 dark:bg-gray-800 dark:text-gray-100"
    >
      <h3 className="text-2xl font-semibold text-primary dark:text-gray-100">
        <Link to={`/app/notes/detail/${id}`}>{title}</Link>
      </h3>
      <p>{body}</p>
      <p className="text-sm justify-self-end">{showFormattedDate(createdAt)}</p>
    </li>
  );
};

export default NoteItem;
