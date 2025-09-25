import { createContext, useEffect, useState } from "react";

const LanguageContext = createContext({
  lang: "en",
  toggleChangeLang: () => {},
});

const LanguageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  const toggleChangeLang = () => {
    setLang((prevState) => (prevState === "en" ? "id" : "en"));
  };

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleChangeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageContextProvider };
