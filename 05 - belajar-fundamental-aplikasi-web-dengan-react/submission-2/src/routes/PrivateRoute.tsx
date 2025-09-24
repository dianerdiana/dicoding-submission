import { Navigate, Outlet } from "react-router";
import { isUserLoggedIn } from "../utils";

const PrivateRoute = () => {
  const isAuthenticated = isUserLoggedIn();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
