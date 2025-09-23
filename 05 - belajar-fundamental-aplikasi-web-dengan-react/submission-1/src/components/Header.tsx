import { Archive } from "react-feather";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-5">
      <h1 className="font-bold text-4xl text-primary items-center">
        <Link to={"/"}>Note App</Link>
      </h1>

      <Link to={"/archives"} className="flex items-center">
        <Archive className="me-2" size={16} />
        <span>Archives</span>
      </Link>
    </header>
  );
};
export default Header;
