import { Plus } from "react-feather";
import { Link } from "react-router";

const FormSearch = ({
  handleSearch,
  searchText,
}: {
  handleSearch: CallableFunction;
  searchText: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <section className="rounded-2xl shadow bg-secondary px-5 py-5 flex-1">
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

      <Link
        to={"/notes/create"}
        className="flex flex-col items-center justify-center bg-primary text-white rounded-2xl px-10 py-2 font-semibold"
      >
        <Plus size={24} />
        <p>Add Note</p>
      </Link>
    </div>
  );
};

export default FormSearch;
