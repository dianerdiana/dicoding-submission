import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const { theme, toggleChangeTheme } = useContext(ThemeContext);

  return { theme, toggleChangeTheme };
};
