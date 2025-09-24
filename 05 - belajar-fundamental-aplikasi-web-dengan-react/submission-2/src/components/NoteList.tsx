import NoteItem from "./NoteItem";
import type { NoteItemType } from "../types/noteItem";

type NoteListType = {
  notes: NoteItemType[] | [];
};

const NoteList = ({ notes }: NoteListType) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteItem
            key={note.id}
            id={note.id}
            title={note.title}
            body={note.body}
            archived={note.archived}
            createdAt={note.createdAt}
          />
        ))
      ) : (
        <li className="bg-secondary rounded-2xl px-4 py-4 w-full">
          <p className="text-center font-semibold text-primary">Note Empty</p>
        </li>
      )}
    </ul>
  );
};

export default NoteList;
