export const FormSearch = () => {
  return (
    <section className="rounded-2xl shadow-2xl bg-secondary px-5 py-5 mt-5">
      <h1 className="font-semibold text-xl text-primary mb-2">Search Note</h1>
      <form>
        <input
          name="search"
          id="search"
          placeholder="Search Title..."
          className="text-lg mb-4 text-primary border-none outline-none"
        />
      </form>
    </section>
  );
};
