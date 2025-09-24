import { Link } from "react-router";
import { getHomeRouteForLoggedInUser } from "../utils";

const NotFoundPage = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center flex-col gap-4">
      <p className="text-9xl text-primary font-bold">404</p>
      <p className="text-primary">Page Not Found</p>

      <Link
        to={getHomeRouteForLoggedInUser()}
        className="border-none outline-none bg-primary rounded-md text-secondary px-8 py-2"
      >
        Back To Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
