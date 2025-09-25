const NoteEditSkeleton = () => {
  return (
    <section className="py-10 shadow rounded-2xl bg-secondary dark:bg-gray-800 px-9 animate-pulse">
      {/* Header */}
      <section className="flex justify-between mb-2">
        {/* Title */}
        <div className="w-1/3 h-8 bg-gray-300 rounded dark:bg-gray-600"></div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full dark:bg-gray-600"></div>
          <div className="w-10 h-10 bg-gray-300 rounded-full dark:bg-gray-600"></div>
        </div>
      </section>

      {/* Form */}
      <form className="flex flex-col">
        {/* Input title */}
        <div className="mb-4 space-y-2">
          <div className="w-3/4 h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="w-1/4 h-4 bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <div className="w-full h-5 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="w-5/6 h-5 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="w-2/3 h-5 bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
      </form>
    </section>
  );
};

export default NoteEditSkeleton;
