import { Outlet } from "react-router";
import Header from "../components/Header";

const Layout = () => {
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 py-4 font-montserrat ">
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
