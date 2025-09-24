import { Archive } from "react-feather";
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

        <NavLink to={"/archives"} className="flex items-center">
          <Archive className="me-2" size={16} />
          <span>Archives</span>
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
