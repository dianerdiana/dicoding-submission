import { Plus } from "react-feather";
import { Link } from "react-router";
import { useTranslate } from "../utils/hooks/useTranslate";

const FormSearch = ({
  handleSearch,
  searchText,
}: {
  handleSearch: CallableFunction;
  searchText: string;
}) => {
  const t = useTranslate();

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <section className="flex-1 px-5 py-5 shadow rounded-2xl bg-secondary dark:bg-gray-800">
        <h1 className="mb-2 text-xl font-semibold text-primary dark:text-gray-100">
          {t("search_note")}
        </h1>
        <form className="flex flex-col">
          <input
            name="search"
            id="search"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={`${t("search_title")}...`}
            className="mb-4 text-lg border-none outline-none text-primary dark:text-secondary"
          />
        </form>
      </section>

      <Link
        to={"/app/notes/create"}
        className="flex flex-col items-center justify-center px-10 py-2 font-semibold text-white bg-primary rounded-2xl"
      >
        <Plus size={24} />
        <p>{t("add_note")}</p>
      </Link>
    </div>
  );
};

export default FormSearch;
