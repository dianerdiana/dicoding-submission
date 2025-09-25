import { useContext } from "react";
import { Archive, LogOut, Moon, Sun } from "react-feather";
import { NavLink, useNavigate } from "react-router-dom";
import { LanguageContext } from "../utils/context/LanguangeContext";
import { useTranslate } from "../utils/hooks/useTranslate";
import { useTheme } from "../utils/hooks/useTheme";
import { useAuth } from "../utils/hooks/useAuth";

const Header = () => {
  const { lang, toggleChangeLang } = useContext(LanguageContext);
  const { theme, toggleChangeTheme } = useTheme();
  const t = useTranslate();
  const navigate = useNavigate();
  const { handleLogout: logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="mb-5">
      <nav className="flex items-center justify-between ">
        <NavLink
          to={"/"}
          className="items-center text-4xl font-bold text-primary dark:text-secondary"
        >
          {t("note_app")}
        </NavLink>

        <div className="flex gap-1">
          <NavLink
            to={"/app/archives"}
            className="flex items-center justify-center p-3 rounded-full shadow bg-secondary dark:bg-gray-800 dark:text-gray-100"
          >
            <Archive size={16} />
          </NavLink>

          <button
            onClick={toggleChangeTheme}
            className="flex items-center justify-center p-3 rounded-full shadow cursor-pointer bg-secondary dark:bg-gray-800 dark:text-gray-100"
          >
            {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={toggleChangeLang}
            className="flex items-center justify-center p-3 rounded-full shadow cursor-pointer bg-secondary dark:bg-gray-800 dark:text-gray-100"
          >
            <span className="leading-4 align-middle">{lang.toUpperCase()}</span>
          </button>

          <button
            onClick={handleLogout}
            title={t("logout")}
            className="flex items-center justify-center p-3 rounded-full shadow cursor-pointer bg-secondary dark:bg-gray-800 dark:text-gray-100"
          >
            <LogOut size={16} />
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Header;
