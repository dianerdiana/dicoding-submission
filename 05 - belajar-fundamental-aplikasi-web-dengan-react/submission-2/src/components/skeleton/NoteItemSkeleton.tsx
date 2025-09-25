const NoteItemSkeleton = () => {
  return (
    <li className="rounded-2xl bg-secondary dark:bg-gray-800 lg:w-[24%] md:w-[48%] w-full p-5 shadow flex flex-col justify-between gap-4 animate-pulse">
      {/* Title skeleton */}
      <div className="w-3/4 h-6 bg-gray-300 rounded dark:bg-gray-600"></div>

      {/* Body skeleton */}
      <div className="space-y-2">
        <div className="w-full h-4 bg-gray-300 rounded dark:bg-gray-600"></div>
        <div className="w-5/6 h-4 bg-gray-300 rounded dark:bg-gray-600"></div>
        <div className="w-2/3 h-4 bg-gray-300 rounded dark:bg-gray-600"></div>
      </div>

      {/* Date skeleton */}
      <div className="w-1/3 h-3 bg-gray-300 rounded dark:bg-gray-600"></div>
    </li>
  );
};

export default NoteItemSkeleton;
