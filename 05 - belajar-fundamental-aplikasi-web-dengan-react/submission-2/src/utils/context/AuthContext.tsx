import { createContext, useEffect, useState } from "react";
import {
  getAccessToken,
  getUserLogged,
  login,
  logout,
  putAccessToken,
} from "../../services/note.service";
import toast from "react-hot-toast";

type AuthContextType = {
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: Record<string, any> | null;
  handleLogin: CallableFunction;
  handleLogout: CallableFunction;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  isLoading: true,
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState(
    () => getAccessToken() || null
  );
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await login({ email, password });

      if (response.error) {
        return toast.error("Login Failed!");
      }

      toast.success("Login Success!");
      putAccessToken(response.data.accessToken);
      setAccessToken(response.data.accessToken);

      const userResponse = await getUserLogged();
      if (!userResponse.error) {
        setUser(userResponse.data);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setAccessToken(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.error(error);
      toast.error("Error: Login failed!");
    }
  };

  const handleLogout = async () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
    setAccessToken(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        setIsAuthenticated(false);
        setUser(null);
        setAccessToken(null);
        setIsLoading(false);
        return;
      }

      const response = await getUserLogged();

      if (!response.error) {
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
