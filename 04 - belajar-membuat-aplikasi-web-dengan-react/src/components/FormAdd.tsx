export const FormAdd = () => {
  return (
    <section className="rounded-2xl shadow-2xl bg-secondary px-9 py-10">
      <h1 className="font-semibold text-3xl text-primary mb-2">Add a Note</h1>
      <form className="flex flex-col">
        <input
          name="title"
          id="title"
          placeholder="Title"
          className="text-2xl mb-4 text-primary border-none outline-none"
        />
        <textarea
          name="body"
          id="body"
          rows={3}
          placeholder="Take a note..."
          className="text-xl text-primary border-none outline-none"
        ></textarea>
        <div className="flex justify-end mt-5">
          <button className="border-none outline-none bg-primary rounded-md text-secondary px-8 py-2">
            Save
          </button>
        </div>
      </form>
    </section>
  );
};
