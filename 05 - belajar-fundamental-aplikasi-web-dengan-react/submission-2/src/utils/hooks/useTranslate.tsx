import { useContext } from "react";
import { LanguageContext } from "../context/LanguangeContext";
import { translations } from "../translations";

export const useTranslate = () => {
  const { lang } = useContext(LanguageContext);

  return (key: keyof (typeof translations)["en"]) => translations[lang][key];
};
