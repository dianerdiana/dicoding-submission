const NoteItemSkeleton = () => {
  return (
    <li className="rounded-2xl bg-secondary lg:w-[24%] md:w-[48%] w-full p-5 shadow flex flex-col justify-between gap-4 animate-pulse">
      {/* Title skeleton */}
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>

      {/* Body skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      {/* Date skeleton */}
      <div className="h-3 bg-gray-300 rounded w-1/3"></div>
    </li>
  );
};

export default NoteItemSkeleton;
