import { Link } from "react-router-dom";
import { getHomeRouteForLoggedInUser } from "../utils";
import { useTranslate } from "../utils/hooks/useTranslate";

const NotFoundPage = () => {
  const t = useTranslate();

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <p className="font-bold text-9xl text-primary dark:text-gray-100">404</p>
      <p className="text-primary dark:text-gray-400">{t("page_not_found")}</p>

      <Link
        to={getHomeRouteForLoggedInUser()}
        className="px-8 py-2 border-none rounded-md outline-none bg-primary hover:bg-blue-800 text-secondary"
      >
        {t("back_to_home")}
      </Link>
    </main>
  );
};

export default NotFoundPage;
