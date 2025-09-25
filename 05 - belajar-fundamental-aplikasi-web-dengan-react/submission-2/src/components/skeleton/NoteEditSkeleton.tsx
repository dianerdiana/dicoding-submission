const NoteEditSkeleton = () => {
  return (
    <section className="rounded-2xl shadow bg-secondary px-9 py-10 animate-pulse">
      {/* Header */}
      <section className="flex justify-between mb-2">
        {/* Title */}
        <div className="h-8 w-1/3 bg-gray-300 rounded"></div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
          <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
        </div>
      </section>

      {/* Form */}
      <form className="flex flex-col">
        {/* Input title */}
        <div className="mb-4 space-y-2">
          <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <div className="h-5 w-full bg-gray-300 rounded"></div>
          <div className="h-5 w-5/6 bg-gray-300 rounded"></div>
          <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
        </div>
      </form>
    </section>
  );
};

export default NoteEditSkeleton;
