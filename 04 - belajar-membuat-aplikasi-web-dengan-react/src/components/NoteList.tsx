import { NoteItem } from "./NoteItem";
import type { NoteItemType } from "../types/noteItem";

type NoteListType = {
  notes: NoteItemType[] | [];
  deleteNote: CallableFunction;
  updateArchived: CallableFunction;
};

export const NoteList = ({
  notes,
  deleteNote,
  updateArchived,
}: NoteListType) => {
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
            deleteNote={deleteNote}
            updateArchived={updateArchived}
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
