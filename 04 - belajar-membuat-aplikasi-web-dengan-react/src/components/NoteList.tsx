import { FileText } from "react-feather";
import { NoteItem } from "./NoteItem";
import type { NoteItemType } from "../types/noteItem";

type NoteListType = {
  notes: NoteItemType[] | [];
  deleteNote: CallableFunction;
};

export const NoteList = ({ notes, deleteNote }: NoteListType) => {
  return (
    <section className="mt-5">
      <h2 className="font-semibold text-xl text-primary mb-2 flex">
        <FileText className="me-2" /> <span>Active Notes</span>
      </h2>
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
            />
          ))
        ) : (
          <li className="bg-secondary rounded-2xl px-4 py-4 w-full">
            <p className="text-center font-semibold text-primary">
              Tidak ada catatan
            </p>
          </li>
        )}
      </ul>
    </section>
  );
};
