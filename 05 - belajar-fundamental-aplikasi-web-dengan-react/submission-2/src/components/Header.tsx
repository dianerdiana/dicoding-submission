import { useContext } from "react";
import { Archive, Moon } from "react-feather";
import { NavLink } from "react-router";
import { LanguageContext } from "../utils/context/LanguangeContext";
import { useTranslate } from "../utils/hooks/useTranslate";

const Header = () => {
  const { lang, toggleChangeLang } = useContext(LanguageContext);
  const t = useTranslate();

  return (
    <header className="mb-5">
      <nav className="flex justify-between items-center ">
        <NavLink
          to={"/"}
          className="font-bold text-4xl text-primary items-center"
        >
          {t("note_app")}
        </NavLink>

        <div className="flex gap-2">
          <NavLink
            to={"/app/archives"}
            className="flex items-center justify-center bg-secondary rounded-full shadow p-3"
          >
            <Archive size={16} />
          </NavLink>

          <button className="flex items-center justify-center bg-secondary rounded-full shadow p-3 cursor-pointer">
            <Moon size={16} />
          </button>

          <button
            onClick={toggleChangeLang}
            className="flex items-center justify-center bg-secondary rounded-full shadow p-3 cursor-pointer"
          >
            <span className="align-middle leading-4">{lang.toUpperCase()}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Header;
