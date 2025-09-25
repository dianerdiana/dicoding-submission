import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { isAuthenticated, user, handleLogin, handleLogout, isLoading } =
    useContext(AuthContext);

  return { isAuthenticated, user, handleLogin, handleLogout, isLoading };
};
