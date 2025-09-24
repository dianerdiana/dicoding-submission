import { Navigate, Outlet } from "react-router";
import { isUserLoggedIn } from "../utils";

const PublicRoute = () => {
  const isAuthenticated = isUserLoggedIn();

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
