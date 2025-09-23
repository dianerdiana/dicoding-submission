const FormSearch = ({
  handleSearch,
  searchText,
}: {
  handleSearch: CallableFunction;
  searchText: string;
}) => {
  return (
    <section className="rounded-2xl shadow bg-secondary px-5 py-5 mt-5">
      <h1 className="font-semibold text-xl text-primary mb-2">Search Note</h1>
      <form className="flex flex-col">
        <input
          name="search"
          id="search"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search Title..."
          className="text-lg mb-4 text-primary border-none outline-none"
        />
      </form>
    </section>
  );
};

export default FormSearch;
