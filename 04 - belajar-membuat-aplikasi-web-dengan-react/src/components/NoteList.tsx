import { NoteItem } from "./NoteItem";

export const NoteList = () => {
  return (
    <section className="mt-5">
      <h2 className="font-semibold text-xl text-primary mb-2 flex">
        <img src="" alt="File Text Icon" /> <span>My Notes</span>
      </h2>
      <ul className="flex flex-wrap">
        <NoteItem />
      </ul>
    </section>
  );
};
