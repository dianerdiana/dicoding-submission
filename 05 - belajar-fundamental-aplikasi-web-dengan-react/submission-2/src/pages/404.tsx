import { Link } from "react-router";
import { getHomeRouteForLoggedInUser } from "../utils";
import { useTranslate } from "../utils/hooks/useTranslate";

const NotFoundPage = () => {
  const t = useTranslate();

  return (
    <main className="w-full h-screen flex justify-center items-center flex-col gap-4">
      <p className="text-9xl text-primary font-bold">404</p>
      <p className="text-primary">{t("page_not_found")}</p>

      <Link
        to={getHomeRouteForLoggedInUser()}
        className="border-none outline-none bg-primary rounded-md text-secondary px-8 py-2"
      >
        {t("back_to_home")}
      </Link>
    </main>
  );
};

export default NotFoundPage;
