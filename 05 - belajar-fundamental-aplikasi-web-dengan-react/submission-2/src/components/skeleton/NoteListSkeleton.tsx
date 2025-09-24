import NoteItemSkeleton from "./NoteItemSkeleton";

const NoteListSkeleton = () => {
  return (
    <ul className="flex flex-wrap gap-4">
      <NoteItemSkeleton />
      <NoteItemSkeleton />
      <NoteItemSkeleton />
      <NoteItemSkeleton />
    </ul>
  );
};

export default NoteListSkeleton;
