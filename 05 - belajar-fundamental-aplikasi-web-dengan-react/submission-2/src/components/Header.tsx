import { Archive, Moon } from "react-feather";
import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="mb-5">
      <nav className="flex justify-between items-center ">
        <NavLink
          to={"/"}
          className="font-bold text-4xl text-primary items-center"
        >
          Note App
        </NavLink>

        <div className="flex gap-2">
          <NavLink
            to={"/archives"}
            className="flex items-center justify-center bg-secondary rounded-full shadow p-3"
          >
            <Archive size={16} />
          </NavLink>
          <button className="flex items-center justify-center bg-secondary rounded-full shadow p-3 cursor-pointer">
            <Moon size={16} />
          </button>
          <button className="flex items-center justify-center bg-secondary rounded-full shadow p-3 cursor-pointer">
            <span className="w-4 h-4 align-middle leading-4">ID</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Header;
